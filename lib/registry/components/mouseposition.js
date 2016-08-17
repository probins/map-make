/**
 * Displays the coordinates of the current mouse position in both lat/lons and
 * projected coordinates.
 *
 * Screen position determined by css in html file.
 */

// import templates
import tpl from './mouseposition.htm.js';
import Component from './component.js';
var component = new Component(tpl, 'mouseposition');

var template = component.getTemplate('mouseposition');
// only style, so can be added to head
document.head.appendChild(template);

import ol from '../../ol.js';
import olMap from '../../olMap.js';
var map = olMap.get();

// mousePosition in LatLons
map.addControl(new ol.control.MousePosition({
  coordinateFormat: function(coordinate) {
    // 4 decimal places for latlons
    return ol.coordinate.toStringHDMS(coordinate) + ' (' +
        ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
  },
  projection: 'EPSG:4326'
}));

// ... and in projected coords
map.addControl(new ol.control.MousePosition({
  coordinateFormat: function(coordinate) {
    // no decimal places for projected coords
    return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
  },
  // set class to override OL default position/style
  className: 'ol-mouse-position projmouse'
}));
