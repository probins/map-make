'use strict';

System.register(['../../../../ol.js', '../../../projections/25831.js'], function (_export, _context) {
  var ol, proj, extent, resolutions;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections25831Js) {
      proj = _projections25831Js.default;
    }],
    execute: function () {
      extent = [258000, 4485000, 536000, 4752000];
      resolutions = [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25];

      _export('default', {
        getLayers: function () {
          return [new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: 'http://mapcache.icc.cat/map/bases/service?',
              attributions: 'Cartographic base from <a target="_blank" ' + 'href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>',
              params: {
                'VERSION': '1.1.1',
                'LAYERS': 'topo'
              },
              tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                extent: extent
              }),
              projection: proj.projCode
            }),
            id: 'Catalan topos'
          })];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions
      });
    }
  };
});
