/**
 * Utility functions for measuring length of linestrings and area of polygons
 * using Haversine formula on WGS84 sphere.
 *
 * Both functions take parameters of geometry and source projection, clone and
 * transform to latlons, and return length/area respectively.
 */

var ol = require('./ol.js');

// create sphere for Haversine distance calculation below
var wgs84Sphere = new ol.Sphere(6378137);

module.exports = {
  getLength: function(geom, sourceProj) {
    // Haversine calculation needs 4326 coords
    var clone = geom.clone().transform(sourceProj, 'EPSG:4326');
    var coords = clone.getCoordinates();
    var length = 0.0;
    for (var i = 1; i < coords.length; i++) {
      length += wgs84Sphere.haversineDistance(coords[i - 1], coords[i]);
    }
    return length;
  },
  getArea: function(geom, sourceProj) {
    var clone = geom.clone().transform(sourceProj, 'EPSG:4326');
    var coords = clone.getLinearRing(0).getCoordinates();
    return Math.abs(wgs84Sphere.geodesicArea(coords));
  }
};
