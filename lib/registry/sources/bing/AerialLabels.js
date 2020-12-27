/**
 * Bing Aerial with Labels
 * Needs API key; see https://msdn.microsoft.com/en-us/library/ff428642.aspx
 * Code: bing/AerialLabels
 * FIXME: attribution and id fixed in English
 */
import { Bing, TileLayer } from '../../../deps.js';
import proj from '../../projections/3857.js';

export default {
  // apikey should be passed in the options object
  getLayers: function(options) {
    return [new TileLayer({
      preload: Infinity,
      source: new Bing({
        key: options.apikey,
        imagerySet: 'AerialWithLabels'
      }),
      id: 'Bing Aerial with Labels'
    })];
  }
};
