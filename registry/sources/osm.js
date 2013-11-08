/** dependencies:
 * ol loaded
 */
(function(CM) {
  CM.rasters = CM.rasters || {};
  CM.rasters.osm = {
    layer: new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    }),
    projCode: 'EPSG:3857'
  };
})(window.CM = window.CM || {});
