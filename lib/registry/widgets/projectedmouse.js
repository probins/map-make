var ol = require('ol');
var map = require('olMap').get();

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
