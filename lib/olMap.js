/**
 * Handles interface with OL3
 *
 * Initial load creates basic map with scaleline, map div, and empty raster and
 * vector layer groups.
 *
 * Exports get() (which returns the map object), and createView() which creates
 * an OL3 view for the given projection.
 */

import ol from './ol.js';

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
  // create target div
  target: createMapTarget(),
  keyboardEventTarget: document
});

// dragzoom interaction
map.addInteraction(new ol.interaction.DragZoom());

// create a default div for the map
function createMapTarget() {
  var mapDiv = document.createElement('div');
  mapDiv.id = 'map';
  document.body.appendChild(mapDiv);
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
  // copied from ol.extent.getCenter
  var defaultCenter = extent ? [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
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


export default {
  createView: createView,
  views: views,

  use4326View: function(options) {
    // vectors only, so use 4326 view
    var projCode = 'EPSG:4326';
    views[projCode] = createView(options, projCode);
    map.set('view', views[projCode]);
  },

  setFocus: function() {
    document.querySelector('#map').focus();
  },

  get: function() {
    return map;
  }
};
