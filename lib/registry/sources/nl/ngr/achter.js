/**
 * Dutch NGR achtergrond WMTS
 * geodata.nationaalgeoregister.nl/tiles/service/wmts/?SERVICE=WMTS&REQUEST=GetCapabilities
 * Code: nl/ngr/achter
 * EPSG:28992
 * FIXME id and attribution English
 */

var ol = require('ol.js');
var proj = require('projections/28992');

var extent = ol.proj.transformExtent([-1.65729160235431, 48.0405018704265, 11.2902578747914, 55.9136415748388],
      'EPSG:4326', proj.projCode),
    resolutions = [1.2288E7 * 0.28E-3, 6144000 * 0.28E-3,
      3072000 * 0.28E-3, 1536000 * 0.28E-3, 768000 * 0.28E-3,
      384000 * 0.28E-3, 192000 * 0.28E-3, 96000 * 0.28E-3,
      48000 * 0.28E-3, 24000 * 0.28E-3, 12000 * 0.28E-3, 6000 * 0.28E-3,
      3000 * 0.28E-3, 1500 * 0.28E-3, 750 * 0.28E-3];

module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/?',
        layer: 'brtachtergrondkaart',
        matrixSet: 'EPSG:28992',
        projection: proj.projCode,
        tileGrid: new ol.tilegrid.WMTS({
          extent: extent,
          sizes: [[1, -1], [2, -2], [4, -4], [8, -8], [16, -16], [32, -32],
              [64, -64], [128, -128], [256, -256], [512, -512], [1024, -1024],
              [2048, -2048], [4096, -4096], [8192, -8192], [16384, -16384]],
          origin: [-285401.92, 903402],
          resolutions: resolutions,
          matrixIds: ['EPSG:28992:0', 'EPSG:28992:1', 'EPSG:28992:2',
              'EPSG:28992:3', 'EPSG:28992:4', 'EPSG:28992:5',
              'EPSG:28992:6', 'EPSG:28992:7', 'EPSG:28992:8',
              'EPSG:28992:9', 'EPSG:28992:10', 'EPSG:28992:11',
              'EPSG:28992:12', 'EPSG:28992:13', 'EPSG:28992:14']
        }),
        style: 'default',
        format: 'image/png',
        attributions: 'Map base: &copy; <a href="http://www.nationaalgeoregister.nl/" target="_blank">' +
              'NGR/PDOK</a>'
      }),
      extent: extent,
      id: 'NGR/PDOK'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
