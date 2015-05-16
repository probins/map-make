var ol = require('ol');
var utils = require('utils');
// require('olcss!jspm:css');
var switcher = require('components/layerswitcher');
var mapDef = require('mapDef');
var status = require('status');

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

map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: false
    })
  }).extend([new ol.control.ScaleLine()]),
  layers: [
    new ol.layer.Group({id: 'rasters'}),
    new ol.layer.Group({id: 'vectors'})
  ],
  // create default target div if not defined in options
  target: mapDef.target || createMapTarget(mapDef.noKeyboardPan)
});


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

function getRasterLayers() {
  return map.getLayers().item(0).getLayers();
}

function getVectorLayers() {
  return map.getLayers().item(1).getLayers();
}

/**
 * params: options (center, zoom and rotation; only on startup),
 *        projection code, extent, resolutions array from layer def
 * returns ol.View instance
 * uses ol as closure
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

function switcherRasterHandler(evt) {
  // uses 'map', 'getRasterLayers', 'getVectorLayers' and 'views' as closure
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  if (!target.value) {
    return; // do nothing if not label or checkbox
  }
  changeRasterLayer(target.value);
}

function changeRasterLayer(newRaster) {
  var layerArray = getRasterLayers().getArray();
  var oldLayers = layerArray.filter(function(l) {
    return l.activeLayer === true;
  });
  var newLayers = layerArray.filter(function(l) {
    return l.getProperties().id == newRaster;
  });
  oldLayers.forEach(function(l) {
    l.setVisible(false);
    l.activeLayer = false;
  });
  newLayers.forEach(function(l) {
    l.setVisible(true);
    l.activeLayer = true;
  });
  var newProjCode = newLayers[0].getSource().getProjection().getCode();
  // 4326 if vectors only
  var defaultCode = (getVectorLayers().getLength() === 0) ? '' : 'EPSG:4326';
  var oldProjCode = oldLayers[0] ? oldLayers[0].getSource().getProjection().getCode() : defaultCode;
  if (newProjCode != oldProjCode) {
    // new projection, so change view and reproject vectors
    if (oldProjCode !== '') {
      var oldExtent = map.getView().calculateExtent(map.getSize());
      var newExtent = ol.proj.transformExtent(oldExtent, oldProjCode, newProjCode);
      getVectorLayers().forEach(function(l) {
        l.getSource().getFeatures().forEach(function(f) {
          f.getGeometry().transform(oldProjCode, newProjCode);
        });
      });
    }
    map.setView(views[newProjCode]);
    if (oldProjCode !== '') {
      map.getView().fitExtent(newExtent, map.getSize());
    }
  }
}

function switcherVectorHandler(evt) {
  // uses 'getVectorLayers' as closure
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  var newLayer = getVectorLayers().getArray().filter(function(l) {
    return l.getProperties().id == target.value;
  })[0]; // only one
  newLayer.setVisible(target.checked);
}

/**
 * params: array of raster modules
 *         options (zoom, rasters for apikey;
 *                  createView uses zoom, center, rotation (only on startup))
 *         all optional
 * needs ol, views, createView, getRasterLayers, switcher, switcherRasterHandler
 */
function addRasters(rasters, options) {
  options = options || {};
  rasters.forEach(function(raster, i) {
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
    }); // zoom may be needed to set param
    // a raster def may have >1 layer, but if so all should be treated as 1
    layers.forEach(function(layer) {
      // set layers invisible to start with
      layer.setVisible(false);
      layer.activeLayer = false;
      // add layer to map
      getRasterLayers().push(layer);
    });

    // add to layerswitcher
    switcher.addRasterDiv(layers[0], switcherRasterHandler);

    if (raster.viewEvent) {
      views[projCode].on(raster.viewEvent.type, raster.viewEvent.func);
    }
  });
}

/**
 * params: array of vector defs
 * needs ol, getVectorLayers, map, getStyle, switcher, switcherVectorHandler, addVectorWidgetButtons
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
  vectors.forEach(function(vector) {
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
          result.forEach(function(r) {
            var geom = new ol.geom[r.geometry.type](r.geometry.coordinates);
            geom.transform('EPSG:4326', projection);
            r.geometry = geom;
            features.push(new ol.Feature(r));
          });
          var mongoLayers = getVectorLayers().getArray().filter(function(l) {
            return l.getProperties().id==vector.id;
          });
          var source = mongoLayers[0].getSource();
          source.addFeatures(features);
        }, utils.errors.fetchFail);
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
    getVectorLayers().push(new ol.layer.Vector(vectOpts));

    // add to layerswitcher
    // if this is 1st vector layer, add vector widget buttons
    if (switcher.addVectorDiv(vector, switcherVectorHandler)) {
      addVectorWidgetButtons(options.components);
    }
  });
}

function getStyle(type) {
  return new ol.style.Style({
    stroke: new ol.style.Stroke(defaultStyles[type].stroke),
    fill: new ol.style.Fill(defaultStyles[type].fill)
  });
}

function addVectorWidgetButtons(components) {
  components = components || {};
  var button;

  if (!components.popup) {
    button = document.createElement('button');
    button.id = 'popupButton';
    button.innerHTML = 'Popup'; // FIXME English
    button.addEventListener('click', function() {
      utils.importComponent('popup');
      this.style.display = 'none';
    });
    document.getElementById('widgets').appendChild(button);
  }

  if (!components.tooltip) {
    button = document.createElement('button');
    button.id = 'tooltipButton';
    button.innerHTML = 'Tooltip'; // FIXME English
    button.addEventListener('click', function() {
      utils.importComponent('tooltip');
      this.style.display = 'none';
    });
    document.getElementById('widgets').appendChild(button);
  }
}

/**
 * Add event returns extent, so can use this to zoom to feature data extent.
 * Make first tile layer visible at this point, so tiles are only fetched after the
 * extent has been established and the appropriate zoom/resolution set.
 * 
 * uses getVectorLayers, map, ol, makeActiveLayerVisible as closures
 */
function addFeaturesListener() {
  var vectorLayers = getVectorLayers().getArray();
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
      makeActiveLayerVisible();
      status.hide();
    }
  };
  vectorLayers.forEach(function(l) {
    l.getSource().once('change', callback);
  });
}

function makeActiveLayerVisible() {
  // may be >1
  getRasterLayers().forEach(function(l) {
    if (l.activeLayer === true) {
      l.setVisible(true);
    }
  });
}

function use4326View(options) {
    // vectors only, so use 4326 view
    var projCode = 'EPSG:4326';
    views[projCode] = createView(options, projCode);
    map.setView(views[projCode]);
  }

module.exports = {
  addInitialRasters: function(rasters, options) {
    addRasters(rasters, options);
    var projCode = rasters[0].projCode || 'EPSG:3857';
    map.setView(views[projCode]);
    getRasterLayers().item(0).activeLayer = true;
    if (!options.vectors) {
      // if no vectors, make 1st raster visible
      makeActiveLayerVisible();
    }
  },
  addInitialVectors: function(options) {
    addVectors(options);
    // by default, maps with vectors zoom to data extent, unless center/zoom set
    if (options.center || options.zoom) {
      if (options.rasters) {
        makeActiveLayerVisible();
      }
    } else {
      // if no center/zoom, delay display of layers until vector data loaded
      addFeaturesListener();
    }
    if (!options.rasters) {
      // if no rasters, 4326 view
      use4326View();
    }
  },
  addRasters: addRasters,
  addVectors: addVectors,
  changeRasterLayer: changeRasterLayer,

  use4326View: use4326View,

  createView: createView,

  makeActiveLayerVisible: makeActiveLayerVisible,
  
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