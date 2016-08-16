'use strict';

System.register(['../../../ol.js'], function (_export, _context) {
  var ol;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }],
    execute: function () {
      _export('default', {
        // apikey should be passed in the options object
        getLayers: function (options) {
          return [new ol.layer.Tile({
            preload: Infinity,
            source: new ol.source.BingMaps({
              key: options.apikey,
              imagerySet: 'Road'
            }),
            id: 'Bing Road'
          })];
        }
      });
    }
  };
});
