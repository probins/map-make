/** dependencies:
 * ol loaded
 */
(function(CM) {
  CM.rasters = CM.rasters || {};
  CM.rasters.osm = {
    layer: new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    projCode: 'EPSG:3857',
    id: 'osm'
  };
})(window.CM = window.CM || {});
