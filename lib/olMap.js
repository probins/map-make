var ol = require('ol');
var mapDef = require('mapDef').get();
require('status');

// 1 view per projection
var views = {};

var map = new ol.Map({
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


module.exports = {
  createView: createView,
  views: views,

  use4326View: function (options) {
    // vectors only, so use 4326 view
    var projCode = 'EPSG:4326';
    views[projCode] = createView(options, projCode);
    map.setView(views[projCode]);
  },

  setFocus: function() {
    map.getTargetElement().focus();
  },

  get: function() {
    return map;
  }
};