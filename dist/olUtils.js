export function transformCoords(e,t){const n=e.clone().transform(t,"EPSG:4326");return e.getType&&"LineString"===e.getType()?n.getCoordinates():n.getLinearRing(0).getCoordinates()}