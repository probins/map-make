/**
 * OpenStreetMap
 * Code: osm/osm
 * EPSG:3857
 * FIXME: attribution fixed in English
 */
var ol = require('../../../ol.js').default;
module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    })];
  }
};
