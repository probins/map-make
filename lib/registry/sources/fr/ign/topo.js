/**
 * French IGN Cartes WTMS
 * 
 * This uses the SCAN tiles, which currently use a temporary apikey
 * https://geoservices.ign.fr/actualites/2023-11-20-acces-donnesnonlibres-gpf
 *
 * This uses a custom WMTS parameter, which is not standard-compliant. OL can
 * use a tileLoadFunction() to insert this.
 * 
 * The apikey ign_scan_ws can be entered when adding the layer.
 *
 * Code: fr/ign/topo
 * EPSG:3857
 * FIXME id and attribution English
 */

import common from './common.js';

const options = {
  resolutions: [4891.96981025128, 2445.98490512564,
      1222.99245256282, 611.49622628141, 305.7481131407048, 152.8740565703525,
      76.43702828517624, 38.21851414258813, 19.10925707129406, 9.554628535647032,
      4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395],
  id: 'IGN Maps',
  layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
  matrixIds: [5,6,7,8,9,10,11,12,13,14,15,16,17,18]
};


export default {
  getLayers: function(inOptions) {
    options.apikey = inOptions.apikey;
    options.private = 'private/';
    return common.getLayers(options);
  },
  extent: common.extent,
  projCode: common.projCode,
  resolutions: options.resolutions
};
