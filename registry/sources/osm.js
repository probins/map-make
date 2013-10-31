/** dependencies:
 * ol loaded
 */
(function(CM) {
  CM.tileSources = CM.tileSources || {};
  CM.tileSources.osm = {
    layer: new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    projCode: 'EPSG:3857'
  };
})(window.CM = window.CM || {});
