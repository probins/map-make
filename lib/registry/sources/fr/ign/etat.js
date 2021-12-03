/**
 * French IGN Etat Major WTMS
 * Free service; key no longer required
 *
 * https://wxs.ign.fr/cartes/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities
 *
 * Code: fr/ign/etat
 * EPSG:3857
 * FIXME id and attribution English
 */

import common from './common.js';

const options = {
  resolutions: [4891.96981025128, 2445.98490512564, 1222.99245256282,
       611.49622628141, 305.7481131407048, 152.8740565703525, 76.43702828517624,
       38.21851414258813, 19.10925707129406, 9.554628535647032, 4.777314267823516],
  id: 'Etat Major',
  layer: 'GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40',
  matrixIds: [5,6,7,8,9,10,11,12,13,14,15]
};


export default {
  getLayers: function(inOptions) {
    options.apikey = "cartes/geoportail";
    return common.getLayers(options);
  },
  extent: common.extent,
  projCode: common.projCode,
  resolutions: options.resolutions
};
