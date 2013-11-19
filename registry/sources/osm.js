/** dependencies:
 * ol loaded
 * FIXME: attribution fixed in English
 */
  module.exports = {
    getLayer: function() {
    	return new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    });
    }
  };
