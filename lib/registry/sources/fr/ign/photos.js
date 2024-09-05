/**
 * French IGN Orthophotos WTMS
 * Free service; key no longer required
 *
 * https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities
 *
 * Code: fr/ign/photos
 * EPSG:3857
 * FIXME id and attribution English
 */

 import common from './common.js';

 const options = {
   resolutions: [4891.96981025128, 2445.98490512564, 1222.99245256282,
       611.49622628141, 305.7481131407048, 152.8740565703525,
       76.43702828517624, 38.21851414258813, 19.10925707129406, 9.554628535647032,
       4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395,
       0.2985821417389697],
   id: 'IGN Aerial Photos',
   layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
   matrixIds: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
 };


 export default {
   getLayers: function(inOptions) {
     return common.getLayers(options);
   },
   extent: common.extent,
   projCode: common.projCode,
   resolutions: options.resolutions
 };
