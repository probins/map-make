/**
 * French IGN Cassini WTMS
 * Free service, but needs an apikey for the URL and layers accessed;
 * see http://professionnels.ign.fr/licence-api-geoportail-libre-et-gratuite
 * This layer is still usable, but is no longer available in the standard
 * online account and must be specifically requested from the IGN.
 *
 * http://wxs.ign.fr/<api key>/wmts?SERVICE=WMTS&REQUEST=GetCapabilities
 *
 * Code: fr/ign/cassini
 * EPSG:3857
 * FIXME id and attribution English
 */
import common from './common.js';

const options = {
 resolutions: [4891.96981025128, 2445.98490512564, 1222.99245256282,
      611.49622628141, 305.7481131407048, 152.8740565703525, 76.43702828517624,
      38.21851414258813, 19.10925707129406, 9.554628535647032, 4.777314267823516],
 id: 'Cassini',
 layer: 'GEOGRAPHICALGRIDSYSTEMS.CASSINI',
 matrixIds: [5,6,7,8,9,10,11,12,13,14,15]
};


export default {
 getLayers: function(inOptions) {
   options.apikey = inOptions.apikey;
   return common.getLayers(options);
 },
 extent: common.extent,
 projCode: common.projCode,
 resolutions: options.resolutions
};
