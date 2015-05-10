var ol = require('ol');
// circular dependency :)
var mm = require('map-make');
var utils = require('utils');
// require('olcss!jspm:css');
var switcher = require('layerswitcher');
var mapDef = require('mapDef');

// 1 view per projection
var map, views = {};
var defaultStyles = {
  normal: {
    stroke: {
      color: 'rgba(0, 0, 255, 0.6)',
      width: 3
    },
    fill: {
      color: 'rgba(255, 255, 255, 0.6)'
    }
  },
  highlight: {
    stroke: {
      color: 'rgba(255, 0, 0, 0.6)',
      width: 3
    },
    fill: {
      color: 'rgba(255, 0, 0, 0.1)'
    }
  }
};

var rasterGroup = new ol.layer.Group({id: 'rasters'});
var vectorGroup = new ol.layer.Group({id: 'vectors'});

map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: false
    })
  }).extend([new ol.control.ScaleLine()]),
  layers: [rasterGroup, vectorGroup],
  // create default target div if not defined in options
  target: mapDef.target || createMapTarget(mapDef.noKeyboardPan)
});


/**
 * params: options (center, zoom and rotation; only on startup),
 *        projection code, extent, resolutions array from layer def
 * returns ol.View instance
 */
function createView(options, projCode, extent, resolutions) {
  options = options || {};
  // default center is center of raster extent; default zoom 0
  var defaultCenter = extent ? ol.extent.getCenter(extent)
      : [0, 0];
  var center = options.center ?
      ol.proj.transform([options.center.lon, options.center.lat], 'EPSG:4326', projCode)
      : defaultCenter;
  var viewOptions = {
    center: center,
    zoom: options.zoom || 0
  };
  if (projCode) {
    viewOptions.projection = projCode;
  }
  if (resolutions) {
    viewOptions.resolutions = resolutions;
  }
  if (options.rotation) {
    viewOptions.rotation = options.rotation;
  }
  return new ol.View(viewOptions);
}
  
// create a default div for the map
function createMapTarget(noKeyboardPan) {
  var mapDiv = document.createElement('div');
  mapDiv.id = 'map';
  mapDiv.style.height = '400px'; // make configurable
  if (!noKeyboardPan) {
    mapDiv.tabIndex=0; // so can use keyboard pan/zoom
  }
  document.body.insertBefore(mapDiv, document.body.childNodes[0]);
  return mapDiv;
}
    
function switcherRasterHandler(evt) {
  // uses 'map', 'rasterGroup', 'vectorGroup' and 'views' as closure
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  if (!target.value) {
    return; // do nothing if not label or checkbox
  }
  var oldLayers = rasterGroup.getLayers().getArray().filter(function(l) {
    return l.activeLayer === true;
  });
  var newLayers = rasterGroup.getLayers().getArray().filter(function(l) {
    return l.getProperties().id == target.value;
  });
  for (var i = 0; i < oldLayers.length; i++) {
    oldLayers[i].setVisible(false);
    oldLayers[i].activeLayer = false;
  }
  for (i = 0; i < newLayers.length; i++) {
    newLayers[i].setVisible(true);
    newLayers[i].activeLayer = true;
  }
  var newProjCode = newLayers[0].getSource().getProjection().getCode();
  var oldProjCode = oldLayers[0] ? oldLayers[0].getSource().getProjection().getCode() : 'EPSG:4326';
  if (newProjCode != oldProjCode) {
    // new projection, so change view and reproject vectors
    var oldExtent = map.getView().calculateExtent(map.getSize());
    var newExtent = ol.proj.transformExtent(oldExtent, oldProjCode, newProjCode);
    vectorGroup.getLayers().forEach(function(l) {
      var features = l.getSource().getFeatures();
      for (var j = 0; j < features.length; j++) {
        features[j].getGeometry().transform(oldProjCode, newProjCode);
      }
    });
    map.setView(views[newProjCode]);
    map.getView().fitExtent(newExtent, map.getSize());
  }
}

function switcherVectorHandler(evt) {
  // uses 'vectorGroup' as closure
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  var newLayer = vectorGroup.getLayers().getArray().filter(function(l) {
    return l.getProperties().id == target.value;
  })[0]; // only one
  newLayer.setVisible(target.checked);
}

/**
 * params: array of raster modules
 *         options (zoom, rasters for apikey;
 *                  createView uses zoom, center, rotation (only on startup))
 *         all optional
 */
function addRasters(rasters, options) {
  options = options || {};
  for (var i = 0; i < rasters.length; i++) {
    var raster = rasters[i];
    // create view for projection
    var projCode = raster.projCode || 'EPSG:3857';
    if (!views[projCode]) {
      // assumes all layers for 1 projection have same extent/resolutions
      views[projCode] = createView(options, projCode, raster.extent, raster.resolutions);
      // ol doesn't export, so need to add to check entered coords/zoom
      views[projCode].extent = raster.extent ||
          ol.proj.transformExtent([-180, -85, 180, 85], 'EPSG:4326', projCode);
      views[projCode].zoomLevels = raster.resolutions ? raster.resolutions.length : 20;
    }
    // raster may be an object with api key
    var apikey, key;
    if (options.rasters && typeof options.rasters[i] === 'object') {
      for (key in options.rasters[i]) {
        apikey = options.rasters[i][key];
      }
    }
    var layers = raster.getLayers({
      zoom: options.zoom,
      apikey: apikey
    }), layer; // zoom may be needed to set param
    // a raster def may have >1 layer, but if so all should be treated as 1
    for (var j = 0; j < layers.length; j++) {
      layer = layers[j];
      // set layers invisible to start with
      layer.setVisible(false);
      // options only present for initial create
      if (options.rasters && i === 0) {
        layer.activeLayer = true;
      } else {
        layer.activeLayer = false;
      }
      // add layer to map
      rasterGroup.getLayers().push(layer);
    }

    // add to layerswitcher
    switcher.addRasterDiv(layer, switcherRasterHandler);

    if (raster.viewEvent) {
      views[projCode].on(raster.viewEvent.type, raster.viewEvent.func);
    }
  }
}

/**
 * params: array of vector defs
 */
function addVectors(options) {
  var vectors = options.vectors;
  var formats = {
    geojson: 'GeoJSON',
    gpx: 'GPX',
    kml: 'KML'
  };
  // var getStyleFunction = function(style) {
  //   return function(feature, resolution) {
  //     return [style];
  //   };
  // };
  for (var i = 0; i < vectors.length; i++) {
    var vector = vectors[i];
    var format, url = vector.url;
    var sourceOptions = {
      attributions: [new ol.Attribution({
        html: vector.attribution || ''
      })]
    };
    if (vector.type == 'mongodb') {
      sourceOptions.loader = function(extent, resolution, projection) {
        utils.httpGet(url).then(function(result) {
          var features = [];
          for (var j = 0; j < result.length; j++) {
            var geom = new ol.geom[result[j].geometry.type](result[j].geometry.coordinates);
            geom.transform('EPSG:4326', projection);
            result[j].geometry = geom;
            features.push(new ol.Feature(result[j]));
          }
          var mongoLayers = vectorGroup.getLayers().getArray().filter(function(l) {
            return l.getProperties().id==vector.id;
          });
          var source = mongoLayers[0].getSource();
          source.addFeatures(features);
        }, mm.errors.fetchFail);
      };
    } else {
      if (url && !vector.format) {
        // define format from file extension
        var ext = url.substring(url.lastIndexOf('.')+1);
        format = formats[ext];
      }
      format = vector.format || format;
      sourceOptions.url = url;
      sourceOptions.format = new ol.format[format]();
    }
    var source = new ol.source.Vector(sourceOptions);
    // if this is an added layer, zoom to data extent
    if (vector.add === true) {
      source.once('change', function(e) {
        map.getView().fitExtent(e.target.getExtent(), map.getSize());
      });
    }
    var vectOpts = {
      source: source,
      id: vector.id || url
    };
    // override default style if in options
    var style = vector.styles ? new ol.style.Style({
        fill: new ol.style.Fill(vector.styles[0].fill || getStyle('normal').getFill()),
        stroke: new ol.style.Stroke(vector.styles[0].stroke || getStyle('normal').getStroke())
      }) : getStyle('normal');
    vectOpts.style = style; //getStyleFunction(style);
    vectorGroup.getLayers().push(new ol.layer.Vector(vectOpts));

    // add to layerswitcher
    // if this is 1st vector layer, add vector widget buttons
    if (switcher.addVectorDiv(vector, switcherVectorHandler)) {
      addVectorWidgetButtons(options.widgets);
    }
  }
}

function getStyle(type) {
  return new ol.style.Style({
    stroke: new ol.style.Stroke(defaultStyles[type].stroke),
    fill: new ol.style.Fill(defaultStyles[type].fill)
  });
}

function addVectorWidgetButtons(widgets) {
  widgets = widgets || {};
  var button, componentDir = 'lib/registry/components/';
  if (!widgets.popup && !System.get('popupmodule')) {
    button = document.createElement('button');
    button.id = 'popupButton';
    button.innerHTML = 'Popup'; // FIXME English
    button.addEventListener('click', function() {
      utils.importComponent('popup', componentDir + 'popup.html');
      this.style.display = 'none';
    });
    document.getElementById('widgets').appendChild(button);
  }

  if (!widgets.tooltip && !System.get('tooltipmodule')) {
    button = document.createElement('button');
    button.id = 'tooltipButton';
    button.innerHTML = 'Tooltip'; // FIXME English
    button.addEventListener('click', function() {
      utils.importComponent('tooltip', componentDir + 'tooltip.html');
      this.style.display = 'none';
    });
    document.getElementById('widgets').appendChild(button);
  }
}



module.exports = {
  addRasters: addRasters,
  addVectors: addVectors,

  create4326View: function(options) {
    // vectors only, so use 4326 view
    var projCode = 'EPSG:4326';
    views[projCode] = createView(options, projCode);
  },

  setDefaultView: function(view) {
    map.setView(views[view]);
  },

  createView: createView,
  
  /**
   * Add event returns extent, so can use this to zoom to feature data extent.
   * Make first tile layer visible at this point, so tiles are only fetched after the
   * extent has been established and the appropriate zoom/resolution set.
   * 
   * params: vectorLayers
   */
  addFeaturesListener: function () {
    var vectorLayers = vectorGroup.getLayers().getArray();
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    // callback
    var callback = function(e) {
      ol.extent.extend(vectorsExtent, e.target.getExtent());
      sourcesRead++;
      if (sourcesRead == vectorLayers.length) {
        // we've loaded all the sources
        // so zoom to data extent and make 1st raster layer visible
        map.getView().fitExtent(vectorsExtent, map.getSize());
        rasterGroup.getLayers().forEach(function(l) {
          if (l.activeLayer === true) {
            l.setVisible(true);
          }
        });
        var status = document.getElementById('status');
        if (status) {
          status.style.display = 'none';
        }
      }
    };
    for (var i = 0; i < vectorLayers.length; i++) {
      vectorLayers[i].getSource().once('change', callback);
    }
  },

  makeActiveLayerVisible: function() {
    // may be >1
    rasterGroup.getLayers().forEach(function(l) {
      if (l.activeLayer === true) {
        l.setVisible(true);
      }
    });
  },
  
  getStyle: getStyle,

  setFocus: function() {
    map.getTargetElement().focus();
  },
  
  // add FeatureOverlay if one not present
  addHighlightOverlay() {
    if (!map.highlightOverlay) {
      map.highlightOverlay = new ol.FeatureOverlay({
        map: map,
        style: getStyle('highlight')
      });
    }
  },

  get: function() {
    return map;
  }
};