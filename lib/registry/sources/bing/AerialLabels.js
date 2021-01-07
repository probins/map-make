/**
 * Bing Aerial with Labels
 * Needs API key; see https://msdn.microsoft.com/en-us/library/ff428642.aspx
 * Code: bing/AerialLabels
 * FIXME: attribution and id fixed in English
 */
import common from './common.js';

const options = {
  imagerySet: 'AerialWithLabels',
  id: 'Bing Aerial with Labels'
};

export default {
  getLayers: function(inOptions) {
    options.apikey = inOptions.apikey;
    return common.getLayers(options);
  }
};



// export default {
//   // apikey should be passed in the options object
//   getLayers: function(options) {
//     return [new TileLayer({
//       preload: Infinity,
//       source: new Bing({
//         key: options.apikey,
//         imagerySet: 'AerialWithLabels'
//       }),
//       id: 'Bing Aerial with Labels'
//     })];
//   }
// };
