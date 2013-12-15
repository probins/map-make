/**
 * Bing Road
 * FIXME: attribution and id fixed in English
 */
var ol = require('ol');
module.exports = {
  getLayers: function(options) {
    return [new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: options.apikey,
        imagerySet: 'Road'
    }),
    id: 'Bing Road'
    })];
  }
};
