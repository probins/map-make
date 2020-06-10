/**
 * Austrian Basemap WMTS
 * http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
 * Code: at/topo
 * EPSG:3857
 * FIXME id and attribution English
 */

import ol from '../../../ext/ol.js';

var extent = [977649.9582335392, 5838029.951202585, 1913529.9492146818, 6281289.924879572],
    resolutions = [1222.9924525644, 611.4962262807999,
      305.74811314039994, 152.87405657047998, 76.43702828523999, 38.21851414248, 19.109257071295996,
      9.554628535647998, 4.777314267823999, 2.3886571339119995, 1.1943285669559998, 0.5971642834779999, 0.29858214174039993];

export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        urls: [
          'https://maps.wien.gv.at/basemap/geolandbasemap/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
          'https://maps1.wien.gv.at/basemap/geolandbasemap/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
          'https://maps2.wien.gv.at/basemap/geolandbasemap/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
          'https://maps3.wien.gv.at/basemap/geolandbasemap/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
          'https://maps4.wien.gv.at/basemap/geolandbasemap/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'
        ],
        format: 'image/png',
        layer: 'geolandbasemap',
        matrixSet: 'google3857',
        requestEncoding: '',
        style: 'normal',
        tileGrid: new ol.tilegrid.WMTS({
          extent: extent,
          sizes: [[128, -128], [256, -256], [512, -512], [1024, -1024],
              [2048, -2048], [4096, -4096], [8192, -8192], [16384, -16384],
              [32768, -32768], [65536, -65536], [131072, -131072], [262144, -262144], [524288, -524288]],
          origin: [-20037508.3428, 20037508.3428],
          resolutions: resolutions,
          matrixIds: ['7','8','9','10','11','12','13','14','15','16','17','18','19']
        }),
        attributions: 'Map base: &copy; <a href="http://www.basemap.at/" target="_blank">' +
              'Austria Basemap</a>'
      }),
      extent: extent,
      id: 'Austria Basemap'
    })];
  },
  extent: extent,
  resolutions: resolutions
};
