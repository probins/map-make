'use strict';

System.register(['../../../ol.js', '../../projections/3035.js'], function (_export, _context) {
  var ol, proj, extent, resolutions;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections3035Js) {
      proj = _projections3035Js.default;
    }],
    execute: function () {
      extent = [2409891.715, 1328424.080, 6143417.136, 5330401.505];
      resolutions = [4000, 3000, 2000, 1000];

      _export('default', {
        getLayers: function () {
          return [new ol.layer.Tile({
            source: new ol.source.TileImage({
              projection: proj.projCode,
              tileGrid: new ol.tilegrid.TileGrid({
                extent: extent,
                tileSize: [200, 200],
                origin: [extent[0], extent[1]],
                resolutions: resolutions
              }),
              tileUrlFunction: function (coordinate) {
                return 'https://map-loader.appspot.com/srtm3035/' + coordinate[0] + '/' + coordinate[1] + '/' + coordinate[2] + '.png';
              },
              attributions: 'SRTM30 data from <a href="http://www2.jpl.nasa.gov/srtm/" target="_blank">NASA/JPL</a>'
            }),
            extent: extent,
            id: 'SRTM LAEA'
          })];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions
      });
    }
  };
});
