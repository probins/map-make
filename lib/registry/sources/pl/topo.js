/**
 * Polish Topo WMTS
 * http://mapy.geoportal.gov.pl/wss/service/WMTS/guest/wmts/TOPO?SERVICE=WMTS&REQUEST=GetCapabilities
 * Code: pl/topo
 * EPSG:4326
 * FIXME id and attribution English
 */

import ol from '../../../ol.js';
var projection = 'EPSG:4326';

var extent = [12, 48.8, 25, 56],
    resolutions = [0.01903568769348934, 0.00951784384674467, 0.004758921923372335,
        0.0023794609616861677, 0.0011897304808430838, 0.0005948652404215419,
        0.00023794609616861675, 0.00011897304808430837, 0.000059486524042154186,
        0.000023794609616861677, 0.000011897304808430838, 0.000004758921923372335,
        0.0000023794609616861674];

export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'https://mapy.geoportal.gov.pl/wss/service/WMTS/guest/wmts/TOPO?',
        layer: 'MAPA TOPOGRAFICZNA',
        matrixSet: 'EPSG:4326',
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
          extent: extent,
          sizes: [[2, -1], [3, -2], [6, -4], [12, -7], [23, -13], [45, -25],
              [111, -62], [221, -123], [442, -245], [1104, -613], [2207, -1225],
              [5517, -3061], [11034, -6121]],
          origin: ol.extent.getTopLeft(extent),
          resolutions: resolutions,
          tileSize: [512, 512],
          matrixIds: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3',
              'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7',
              'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12']
        }),
        style: 'default',
        requestEncoding: 'KVP',
        attributions: 'Map base: &copy; <a href="http://geoportal.gov.pl/" target="_blank">' +
              'Polish Geoportal</a>'
      }),
      extent: extent,
      id: 'Polish Geoportal'
    })];
  },
  extent: extent,
  projCode: projection,
  resolutions: resolutions
};
