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
      extent = [-100000, 3950000, 1150000, 4870000];
      resolutions = [1800, 900, 450, 225, 120, 50, 25, 10, 4.5, 3, 2, 1, 0.5];

      _export('default', {
        getLayers: function () {
          // FIXME id and attribution fixed in English
          return [new ol.layer.Tile({
            source: new ol.source.TileWMS({
              url: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster',
              attributions: 'Cartographic base &copy; <a target="_blank" ' + 'href="http://www.idee.es/">Instituto Geográfico Nacional de España</a>',
              params: {
                'LAYERS': 'mtn_rasterizado'
              },
              tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                extent: extent
              }),
              projection: proj.projCode
            }),
            id: 'IGN topos'
          })];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions
      });
    }
  };
});
