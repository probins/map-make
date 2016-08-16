/**
 * Czech ČÚZK Geoportal WMTS
 * http://geoportal.cuzk.cz/WMTS_ZM/WMTService.aspx?service=WMTS&request=GetCapabilities
 * Code: cz/zm
 * EPSG:32633
 * does not appear to be accessible via https
 * FIXME id and attribution English
 */

import ol from '../../../ol.js';
import proj from '../../projections/32633.js';

var extent = [271930.21444912557, 5341447.7731205318, 785000.29368089978, 5698085.9402167993],
    resolutions = [3657600 * 0.28E-3, 1828800 * 0.28E-3, 914400 * 0.28E-3,
    457200 * 0.28E-3, 228600 * 0.28E-3, 114300 * 0.28E-3, 57150 * 0.28E-3,
    28575 * 0.28E-3, 14287.5 * 0.28E-3, 7143.75 * 0.28E-3, 3571.875 * 0.28E-3];

export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'http://geoportal-zm.cuzk.cz/WMTS_ZM/service.svc/get?',
        layer: 'zm',
        matrixSet: 'wgs84:utm33n:epsg:32633',
        projection: proj.projCode,
        tileGrid: new ol.tilegrid.WMTS({
          extent: extent,
          sizes: [[2, -2], [4, -4], [8, -8], [16, -16], [32, -32], [64, -64],
              [128, -128], [256, -256], [512, -512], [1024, -1024], [2048, -2048]],
          origin: [262118.065518070010, 5711442.0600491296],
          resolutions: resolutions,
          matrixIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }),
        style: 'default',
        attributions: 'Map base: &copy; <a href="http://geoportal.cuzk.cz/" target="_blank">' +
              'ČÚZK</a>'
      }),
      extent: extent,
      id: 'ČÚZK (CZ)'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
