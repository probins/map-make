'use strict';

System.register(['../../../../ol.js', '../../../projections/25830.js'], function (_export, _context) {
  var ol, proj, extent, resolutions;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections25830Js) {
      proj = _projections25830Js.default;
    }],
    execute: function () {
      extent = [-1079526.585009098, 2450926.618387835, 1462559.4951461395, 5127818.100512035];
      resolutions = [8735660.377232144 * 0.28E-3, 4367830.188616072 * 0.28E-3, 2183915.094308036 * 0.28E-3, 1091957.547154018 * 0.28E-3, 545978.773577009 * 0.28E-3, 272989.38678571396 * 0.28E-3, 136494.69339285715 * 0.28E-3, 68247.34669642858 * 0.28E-3, 34123.67334821425 * 0.28E-3, 17061.836674107144 * 0.28E-3, 8530.918337053572 * 0.28E-3, 4265.459168526786 * 0.28E-3];

      _export('default', {
        getLayers: function () {
          return [new ol.layer.Tile({
            source: new ol.source.WMTS({
              url: 'https://www.ign.es/wmts/mapa-raster?',
              layer: 'MTN',
              matrixSet: proj.projCode,
              projection: proj.projCode,
              tileGrid: new ol.tilegrid.WMTS({
                extent: extent,
                sizes: [[5, -8], [10, -15], [20, -29], [40, -57], [79, -114], [158, -228], [315, -456], [630, -911], [1259, -1821], [2517, -3641], [5034, -7283], [10067, -14565]],
                origins: [[-1968157.095, 7827955], [-1968157.095, 7514869], [-1968157.095, 7358326], [-1968157.095, 7280055], [-1968157.095, 7280055], [-1968157.095, 7280055], [-1968157.095, 7280055], [-1968157.095, 7275163], [-1968157.095, 7272717], [-1968157.095, 7271494], [-1968157.095, 7272105], [-1968157.095, 7271800]],
                resolutions: resolutions,
                matrixIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
              }),
              style: 'default',
              attributions: 'Map base: &copy; <a href="http://www.ign.es/" target="_blank">' + 'Instituto Geográfico Nacional de España</a>'
            }),
            extent: extent,
            id: 'IGN Mapas'
          })];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions
      });
    }
  };
});
