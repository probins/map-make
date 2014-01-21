// layerswitcher to different projections uses following functions not currently exported:
// source.getProjection(); vectorsource.getFeatures();
// geometry.getBounds() (can be removed when ol issue fixed)

var ol = require('ol');
// require('olcss!jspm:css');

// 1 view per projection
var map, views = {};
// create layer switcher divs
var layersDiv = document.createElement('div');
layersDiv.id = 'layerswitch';
var rastersDiv = document.createElement('div');
rastersDiv.id = 'rasters';
var vectorsDiv = document.createElement('div');
vectorsDiv.id = 'vectors';
var divs = {
	rasters: rastersDiv,
  vectors: vectorsDiv
};
var added = {
  rasters: false,
  vectors: false
};

function addLayersDiv(div, name) {
  var label = document.createElement('div');
  label.innerHTML = name;
  layersDiv.appendChild(label);
  layersDiv.appendChild(divs[div]);
  added[div] = true;
}

/**
 * params: options (center, zoom and rotation),
 *        projection code, extent, resolutions array from layer def
 * returns ol.View2D instance
 */
function createView(options, projCode, extent, resolutions) {
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
  return new ol.View2D(viewOptions);
}
  
// create a default div for the map
function createMapTarget(noKeyboardPan) {
  var mapDiv = document.createElement('div');
  mapDiv.id = 'map';
  mapDiv.style.height = '400px'; // make configurable
  if (!noKeyboardPan) {
    mapDiv.tabIndex=0; // so can use keyboard pan/zoom
  }
  document.body.appendChild(mapDiv);
  return mapDiv;
}
    
function switcherRasterHandler(evt) {
  // uses 'map' as closure
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  if (!target.value) {
    return; // do nothing if not label or checkbox
  }
  var oldLayers = map.getLayers().getArray().filter(function(l) {
    return l.activeLayer === true;
  });
  var newLayers = map.getLayers().getArray().filter(function(l) {
    return l.get('id') == target.value;
  });
  for (var i = 0; i < oldLayers.length; i++) {
    oldLayers[i].setVisible(false);
    oldLayers[i].activeLayer = false;
  }
  for (i = 0; i < newLayers.length; i++) {
    newLayers[i].setVisible(true);
    newLayers[i].activeLayer = true;
  }
  // FIXME getProjection not currently exported
  var newProjCode = newLayers[0].getSource().getProjection().getCode();
  var oldProjCode = oldLayers[0].getSource().getProjection().getCode();
  if (newProjCode != oldProjCode) {
    // new projection, so change view and reproject vectors
    var oldExtent = map.getView().calculateExtent(map.getSize());
    var transformer = ol.proj.getTransform(oldProjCode, newProjCode);
    var newExtent = ol.extent.transform(oldExtent, transformer);
    var vectorLayers = map.getLayers().getArray().filter(function(l) {
      return ol.layer.Vector && l instanceof ol.layer.Vector;
    });
    for (i = 0; i < vectorLayers.length; i++) {
      // FIXME not in api
      var features = vectorLayers[i].getSource().getFeatures();
      for (var feature in features) {
        features[feature].getGeometry().transform(transformer);
      }
    }
    map.setView(views[newProjCode]);
    map.getView().fitExtent(newExtent, map.getSize());
  }
}

function switcherVectorHandler(evt) {
  // uses 'map' as closure
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  var newLayer = map.getLayers().getArray().filter(function(l) {
    return l.get('id') == target.value;
  })[0]; // only one
  newLayer.setVisible(target.checked);
}

/**
 * params: array of raster modules
 *         options (zoom, rasters for apikey;
 *                  createView uses zoom, center, rotation)
 */
function addRasters(rasters, options) {
  for (var i = 0; i < rasters.length; i++) {
    var raster = rasters[i];
    // create view for projection
    var projCode = raster.projCode || 'EPSG:3857';
    if (!views[projCode]) {
      // assumes all layers for 1 projection have same extent/resolutions
      views[projCode] = createView(options, projCode, raster.extent, raster.resolutions);
    }
    var apikey, key;
    if (typeof options.rasters[i] === 'object') {
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
      if (i === 0) {
        layer.activeLayer = true;
      } else {
        layer.activeLayer = false;
      }
      // add layer to map
      map.addLayer(layer);
    }
    // create layerswitcher element
    var inputElem = document.createElement('input');
    inputElem.name = 'rasters';
    inputElem.value = inputElem.id = layer.get('id');
    inputElem.type = 'radio';
    if (i === 0) {
      inputElem.checked = true;
    }
    var label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'bottom';
    var div = document.createElement('div');
    div.appendChild(inputElem);
    div.appendChild(label);
    div.onclick = switcherRasterHandler;
    rastersDiv.appendChild(div);
    if (!added.rasters) {
      addLayersDiv('rasters', 'Rasters'); // FIXME English
   }
  
    if (raster.viewEvent) {
      views[projCode].on(raster.viewEvent.type, raster.viewEvent.func);
    }
  }
}

function addVectors(vectors) {
  var parsers = {
    geojson: 'GeoJSON',
    gpx: 'GPX',
    kml: 'KML'
  };
  for (var i = 0; i < vectors.length; i++) {
    var vector = vectors[i];
    var parser, url = vector.url;
    if (!vector.parser) {
      // define parser from file extension
      var ext = url.substring(url.lastIndexOf('.')+1);
      parser = parsers[ext];
    }
    parser = vector.parser || parser;
    var vectOpts = {
      source: new ol.source.Vector({
        url: url,
        attributions: [new ol.Attribution({
          html: vector.attribution
        })],
        parser: new ol.parser[parser]()
      }),
      id: vector.id
    };
    // default stroke style
    var stroke = {
      "color": "#0000cc",
      "width": 3,
      "opacity": 0.7
    };
    // override if in options
    if (vector.styles) {
      if (vector.styles[0].stroke) {
        stroke = vector.styles[0].stroke;
      }
    }
    vectOpts.style = new ol.style.Style({
      symbolizers: [
        new ol.style.Stroke(stroke)
      ]
    });
    map.addLayer(new ol.layer.Vector(vectOpts));

    // add to layerswitcher
    var inputElem = document.createElement('input');
    inputElem.name = inputElem.id = inputElem.value = vector.id;
    inputElem.type = 'checkbox';
    inputElem.checked = true;
    var label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'baseline';
    var div = document.createElement('div');
    div.appendChild(inputElem);
    div.appendChild(label);
    div.onclick = switcherVectorHandler;
    vectorsDiv.appendChild(div);
    if (!added.vectors) {
      addLayersDiv('vectors', 'Vectors'); // FIXME English
    }
  }
}


module.exports = {
  createMap: function(target, noKeyboardPan) {
    map = new ol.Map({
    //   renderer: ol.RendererHint.CANVAS, // currently only canvas handles vectors
      // create default target div if not defined in options 
      target: target || createMapTarget(noKeyboardPan)
    });
  },

  addRasters: addRasters,
  addVectors: addVectors,
  addLayersDiv: addLayersDiv,

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
    var vectorLayers = map.getLayers().getArray().filter(function(l) {
      return l instanceof ol.layer.Vector;
    });
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    // callback
    var callback = function(e) {
      // FIXME when https://github.com/openlayers/ol3/issues/1134 fixed
      for (var i = 0; i < e.features.length; i++) {
        ol.extent.extend(vectorsExtent, e.features[i].getGeometry().getBounds());
      }
      // ol.extent.extend(vectorsExtent, e.extents ? e.extents[0] : e.hg[0]);
      sourcesRead++;
      if (sourcesRead == vectorLayers.length) {
        // we've loaded all the sources
        // so zoom to data extent and make 1st raster layer visible
        map.getView().fitExtent(vectorsExtent, map.getSize());
        var rasterLayer0 = map.getLayers().getArray().filter(function(l) {
          return l.activeLayer === true;
        })[0]; // only one
        if (rasterLayer0) {
          rasterLayer0.setVisible(true);
        }
        var status = document.getElementById('status');
        if (status) {
          status.style.display = 'none';
        }
      }
    };
    for (var i = 0; i < vectorLayers.length; i++) {
      vectorLayers[i].getSource().addEventListener('featureload', callback);
    }
  },

  make1stLayerVisible: function() {
    // may be >1
    map.getLayers().getArray().filter(function(l) {
      return l.activeLayer === true;
    }).forEach(function(e){e.setVisible(true);});
  },
  
  setFocus: function() {
    map.getTarget().focus();
  },
  
  getLayersDiv: function() {
    return layersDiv;
  },

  get: function() {
    return map;
  }
};