/**
 * Bing Maps common code
 * Needs API key; see https://msdn.microsoft.com/en-us/library/ff428642.aspx
 */
import Bing from 'ol/source/BingMaps.js';
import TileLayer from 'ol/layer/Tile.js';
// import { Bing, TileLayer } from '../../../deps.js';
import proj from '../../projections/3857.js';

export default {
  getLayers: function(options) {
    // apikey should be passed in the options object
    return [new TileLayer({
      id: options.id,
      preload: Infinity,
      source: new Bing({
        key: options.apikey,
        imagerySet: options.imagerySet
      })
    })];
  }
};
