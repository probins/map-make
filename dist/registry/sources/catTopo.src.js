"es6-transpile";
define(
  [],
  function() {
    "use strict";
    var ol = require('ol');
    var proj = require('../projections/25831');
    var extent = [258000, 4485000, 536000, 4752000];
    module.exports = {
      getLayers: function() {
        return [new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://mapcache.icc.cat/map/bases/service?',
            attributions: [new ol.Attribution({html: 'Cartographic base from <a target="_blank" ' + 'href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>'})],
            params: {
              'VERSION': '1.1.1',
              'LAYERS': 'topo'
            },
            extent: extent,
            projection: proj.projCode
          }),
          id: 'Catalan topos'
        })];
      },
      extent: extent,
      projCode: proj.projCode,
      resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]
    };
  });