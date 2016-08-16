'use strict';

System.register(['../../../../ol.js', '../../../projections/21781.js'], function (_export, _context) {
  var ol, proj, extent, resolutions;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections21781Js) {
      proj = _projections21781Js.default;
    }],
    execute: function () {
      extent = [420000, 30000, 900000, 350000];
      resolutions = [500, 250, 100, 50, 20, 10, 5, 2.5, 2];

      _export('default', {
        getLayers: function () {
          return [new ol.layer.Tile({
            source: new ol.source.WMTS({
              url: 'https://wmts{0-4}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/20151231/21781/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
              layer: 'ch.swisstopo.pixelkarte-farbe',
              matrixSet: '21781',
              projection: proj.projCode,
              tileGrid: new ol.tilegrid.WMTS({
                extent: extent,
                resolutions: resolutions,
                matrixIds: [15, 16, 17, 18, 19, 20, 21, 22, 23]
              }),
              style: 'default',
              requestEncoding: 'REST',
              attributions: 'Topomaps &copy; <a target="_blank" href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/services/web_services/webaccess.html">swisstopo</a>'
            }),
            extent: extent,
            id: 'Swiss Topo'
          })];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions
      });
    }
  };
});
