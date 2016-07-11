/**
 * Bing Road
 * Needs API key; see https://msdn.microsoft.com/en-us/library/ff428642.aspx
 * Code: bing/Road
 * FIXME: attribution and id fixed in English
 */
var ol = require('../../../ol.js');
module.exports = {
  // apikey should be passed in the options object
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
