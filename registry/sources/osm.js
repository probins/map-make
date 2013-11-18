/** dependencies:
 * ol loaded
 * FIXME: attribution fixed in English
 */
// (function(CM) {
  CM.rasters = CM.rasters || {};
  CM.rasters.osm = {
    getLayer: function() {
    	return new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    });
    }
  };
// })(window.CM = window.CM || {});
