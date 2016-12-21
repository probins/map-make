/**
 * Utility functions for measuring length of linestrings and area of polygons
 * using Haversine formula on WGS84 sphere.
 *
 * Both functions take parameters of geometry and source projection, clone and
 * transform to latlons, and return length/area respectively.
 */

// WGS84 radius for Haversine distance and area calculation below
// these funcs adapted from ol.Sphere/ol/math
var radius = 6378137;

var toRadians = function(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
};

var geodesicArea = function(coordinates) {
  var area = 0, len = coordinates.length;
  var x1 = coordinates[len - 1][0];
  var y1 = coordinates[len - 1][1];
  for (var i = 0; i < len; i++) {
    var x2 = coordinates[i][0], y2 = coordinates[i][1];
    area += toRadians(x2 - x1) *
        (2 + Math.sin(toRadians(y1)) +
        Math.sin(toRadians(y2)));
    x1 = x2;
    y1 = y2;
  }
  return area * radius * radius / 2.0;
};
var haversineDistance = function(c1, c2) {
  var lat1 = toRadians(c1[1]);
  var lat2 = toRadians(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) +
      Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) *
      Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};


export default {
  getLength: function(geom, sourceProj) {
    // Haversine calculation needs 4326 coords
    var clone = geom.clone().transform(sourceProj, 'EPSG:4326');
    var coords = clone.getCoordinates();
    var length = 0.0;
    for (var i = 1; i < coords.length; i++) {
      length += haversineDistance(coords[i - 1], coords[i]);
    }
    return length;
  },
  getArea: function(geom, sourceProj) {
    var clone = geom.clone().transform(sourceProj, 'EPSG:4326');
    var coords = clone.getLinearRing(0).getCoordinates();
    return Math.abs(geodesicArea(coords));
  }
};
