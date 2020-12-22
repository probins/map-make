/**
 * Bing Aerial with Labels
 * Needs API key; see https://msdn.microsoft.com/en-us/library/ff428642.aspx
 * Code: bing/AerialLabels
 * FIXME: attribution and id fixed in English
 */
import { ol } from '../../../deps.js';
import proj from '../../projections/3857.js';

export default {
  // apikey should be passed in the options object
  getLayers: function(options) {
    return [new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: options.apikey,
        imagerySet: 'AerialWithLabels'
      }),
      id: 'Bing Aerial with Labels'
    })];
  }
};
