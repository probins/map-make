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
