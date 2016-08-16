'use strict';

System.register(['../../../ol.js'], function (_export, _context) {
  var ol;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }],
    execute: function () {
      _export('default', {
        getLayers: function () {
          return [new ol.layer.Tile({
            source: new ol.source.OSM(),
            id: 'OpenStreetMap'
          })];
        }
      });
    }
  };
});
