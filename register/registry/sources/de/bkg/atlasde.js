'use strict';

System.register(['../../../../ol.js', '../../../projections/25832.js'], function (_export, _context) {
  var ol, proj, extent, resolutions;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections25832Js) {
      proj = _projections25832Js.default;
    }],
    execute: function () {
      extent = [-46133.17, 5048875.268575671, 1206211.101424329, 6301219.54];
      resolutions = [1.7471320750895232E7 * 0.28E-3, 8735660.375447616 * 0.28E-3, 4367830.187723808 * 0.28E-3, 2183915.093861904 * 0.28E-3, 1091957.546930952 * 0.28E-3, 545978.7734654777 * 0.28E-3, 272989.3867327382 * 0.28E-3, 136494.6933663689 * 0.28E-3, 68247.34668318463 * 0.28E-3, 34123.67334159224 * 0.28E-3, 17061.83667079614 * 0.28E-3];

      _export('default', {
        getLayers: function () {
          return [new ol.layer.Tile({
            source: new ol.source.WMTS({
              url: 'https://sg.geodatenzentrum.de/wmts_webatlasde.light?',
              layer: 'webatlasde.light',
              matrixSet: 'DE_EPSG_25832_LIGHT',
              projection: proj.projCode,
              tileGrid: new ol.tilegrid.WMTS({
                extent: extent,
                sizes: [[1, -1], [2, -2], [4, -4], [8, -8], [16, -16], [32, -32], [64, -64], [128, -128], [256, -256], [512, -512], [1024, -1024]],
                origin: ol.extent.getTopLeft(extent),
                resolutions: resolutions,
                matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }),
              style: 'default',
              attributions: 'Map base: &copy; GeoBasis-DE / <a href="http://www.bkg.bund.de/" target="_blank">' + 'BKG</a> ' + new Date().getFullYear()
            }),
            extent: extent,
            id: 'BKG (DE)'
          })];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions
      });
    }
  };
});
