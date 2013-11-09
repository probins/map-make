/** dependencies:
 * ol loaded
 */
(function(CM) {
  CM.rasters = CM.rasters || {};
  CM.rasters.osm = {
    layer: new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    })
  };
})(window.CM = window.CM || {});
