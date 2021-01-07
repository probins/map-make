/**
 * Bing Road
 * Needs API key; see https://msdn.microsoft.com/en-us/library/ff428642.aspx
 * Code: bing/Road
 * FIXME: attribution and id fixed in English
 */
import common from './common.js';

const options = {
  imagerySet: 'Road',
  id: 'Bing Road'
};

export default {
  getLayers: function(inOptions) {
    options.apikey = inOptions.apikey;
    return common.getLayers(options);
  }
};


// import { Bing, TileLayer } from '../../../deps.js';
// import proj from '../../projections/3857.js';
//
// export default {
//   // apikey should be passed in the options object
//   getLayers: function(options) {
//     return [new TileLayer({
//       preload: Infinity,
//       source: new Bing({
//         key: options.apikey,
//         imagerySet: 'Road'
//       }),
//       id: 'Bing Road'
//     })];
//   }
// };
