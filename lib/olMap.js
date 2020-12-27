/**
 * Handles interface with OL3
 *
 * Initial load creates basic map with scaleline, map div, and empty raster and
 * vector layer groups.
 *
 * Exports get() (which returns the map object), and createView() which creates
 * an OL3 view for the given projection.
 */

import { Control, controlDefaults, GroupLayer, Map, ScaleLine, transform, View } from './deps.js';

// 1 view per projection
var views = {};

var map = new Map({
  controls: controlDefaults({
    attributionOptions: ({
      collapsible: false
    })
  }).extend([new ScaleLine()]),
  layers: [
    new GroupLayer({id: 'rasters'}),
    new GroupLayer({id: 'vectors'})
  ],
  // create target div
  target: createMapTarget(),
  keyboardEventTarget: document
});

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
* returns View instance
* uses ol as closure
*/
function createView(options, projCode, extent, resolutions) {
  options = options || {};
  // default center is center of raster extent; default zoom 0
  // copied from extent.getCenter
  var defaultCenter = extent ? [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
      : [0, 0];
  var center = options.center ?
      transform([options.center.lon, options.center.lat], 'EPSG:4326', projCode)
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
  return new View(viewOptions);
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
  },

  addControl: function(element) {
    // 2 children in each element: style and content
    // style element
    document.body.appendChild(element.firstElementChild);
    // content element
    // use control to prevent event propagation
    map.addControl(new Control({element: element.lastElementChild}));
  }
};
