/**
 * OpenStreetMap
 * FIXME: attribution fixed in English
 */
var ol = require('ol');
module.exports = {
  getLayer: function() {
    return new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    });
  }
};
