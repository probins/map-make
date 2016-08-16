'use strict';

System.register(['./ol.js'], function (_export, _context) {
  var ol, wgs84Sphere;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }],
    execute: function () {
      wgs84Sphere = new ol.Sphere(6378137);

      _export('default', {
        getLength: function (geom, sourceProj) {
          // Haversine calculation needs 4326 coords
          var clone = geom.clone().transform(sourceProj, 'EPSG:4326');
          var coords = clone.getCoordinates();
          var length = 0.0;
          for (var i = 1; i < coords.length; i++) {
            length += wgs84Sphere.haversineDistance(coords[i - 1], coords[i]);
          }
          return length;
        },
        getArea: function (geom, sourceProj) {
          var clone = geom.clone().transform(sourceProj, 'EPSG:4326');
          var coords = clone.getLinearRing(0).getCoordinates();
          return Math.abs(wgs84Sphere.geodesicArea(coords));
        }
      });
    }
  };
});
