/**
 * OpenStreetMap
 * FIXME: attribution fixed in English
 */
var ol = require('ol');
module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    })];
  }
};
