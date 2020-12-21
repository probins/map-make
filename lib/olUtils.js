/**
 * Exports transformCoords function
 *
 * Function to take parameters of OL LineString or Polygon geometry,
 * together with projection, and transform to lonlats.
 *
 * Must be cloned so original not changed.
 *
 * Return transformed coordinates of LineString or first LinearRing.
 */

export function transformCoords(geom, sourceProj) {
  let clone = geom.clone().transform(sourceProj, 'EPSG:4326');
  if (geom.getType && geom.getType() === 'LineString') {
    return clone.getCoordinates();
  } else { // polygon
    return clone.getLinearRing(0).getCoordinates();
  }
}
