var ol = require('ol');
var map = require('olMap').get();

// mousePosition in LatLons
map.addControl(new ol.control.MousePosition({
    coordinateFormat: function(coordinate) {
      // 4 decimal places for latlons
      return ol.coordinate.toStringHDMS(coordinate) + ' (' +
          ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
    },
    projection: 'EPSG:4326'
  })
);

// ... and in projected coords
var style = document.createElement('style');
// FIXME: make configurable
style.appendChild(document.createTextNode('.projmouse {top: 28px}'));
document.head.appendChild(style);
map.addControl(new ol.control.MousePosition({
    coordinateFormat: function(coordinate) {
      // no decimal places for projected coords
      return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
    },
    // set class to override OL default position/style
    className: 'ol-mouse-position projmouse'
  })
);

var mapDef = require('mapDef').getMapDef();
mapDef.widgets = mapDef.widgets || {};
mapDef.widgets.mousePosition = true;
