/**
 * Exports getLength and getArea functions.
 *
 * Utility functions for measuring length of linestrings and area of polygons
 * using Haversine formula on WGS84 sphere.
 *
 * Both functions take parameter of EPSG:4326 coordinates, and
 * return length/area respectively.
 *
 * Adapted from ol.Sphere/ol.math
 */

// WGS84 radius for Haversine distance and area calculation below
const radius = 6378137;

function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}

function geodesicArea(coordinates) {
  let area = 0;
  const len = coordinates.length;
  let x1 = coordinates[len - 1][0], y1 = coordinates[len - 1][1];
  for (let i = 0; i < len; i++) {
    const x2 = coordinates[i][0], y2 = coordinates[i][1];
    area += toRadians(x2 - x1) *
        (2 + Math.sin(toRadians(y1)) +
        Math.sin(toRadians(y2)));
    x1 = x2;
    y1 = y2;
  }
  return area * radius * radius / 2.0;
}

function haversineDistance(c1, c2) {
  const lat1 = toRadians(c1[1]),
      lat2 = toRadians(c2[1]),
      deltaLatBy2 = (lat2 - lat1) / 2,
      deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
  const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) +
      Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) *
      Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getLength(coords) {
  // Haversine calculation needs 4326 coords
  let length = 0.0;
  for (let i = 1; i < coords.length; i++) {
    length += haversineDistance(coords[i - 1], coords[i]);
  }
  return length;
}

export function getArea(coords) {
  return Math.abs(geodesicArea(coords));
}
