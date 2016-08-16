/**
 * Dutch NGR achtergrond WMTS
 * geodata.nationaalgeoregister.nl/tiles/service/wmts/?SERVICE=WMTS&REQUEST=GetCapabilities
 * Code: nl/ngr/achter
 * EPSG:25831 - doesn't seem to work properly, use achter.js instead
 * FIXME id and attribution English
 */

import ol from '../../../../ol.js';
import proj from '../../../projections/25831.js';

var extent = [152899.38573827292, 5331303.1116642505, 1117699.0743967355, 6227564.86211202],
    resolutions = [1.0E7 * 0.28E-3, 5000000 * 0.28E-3,
      2500000 * 0.28E-3, 1000000 * 0.28E-3, 500000 * 0.28E-3,
      250000 * 0.28E-3, 100000 * 0.28E-3, 75000 * 0.28E-3,
      50000 * 0.28E-3, 25000 * 0.28E-3, 10000 * 0.28E-3, 5000 * 0.28E-3];

export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/?',
        layer: 'brtachtergrondkaart',
        matrixSet: 'EPSG:25831:RWS',
        projection: proj.projCode,
        tileGrid: new ol.tilegrid.WMTS({
          extent: extent,
          sizes: [[9, -6], [17, -12], [34, -23], [85, -57], [170, -113], [339, -226],
              [847, -563], [1129, -751], [1694, -1126], [3387, -2252], [8466, -5629],
              [16932, -11257]],
          origin: [-2404683.40738879, 8298458],
          resolutions: resolutions,
          matrixIds: ['EPSG:25831:RWS:0', 'EPSG:25831:RWS:1', 'EPSG:25831:RWS:2',
              'EPSG:25831:RWS:3', 'EPSG:25831:RWS:4', 'EPSG:25831:RWS:5',
              'EPSG:25831:RWS:6', 'EPSG:25831:RWS:7', 'EPSG:25831:RWS:8',
              'EPSG:25831:RWS:9', 'EPSG:25831:RWS:10', 'EPSG:25831:RWS:11']
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
