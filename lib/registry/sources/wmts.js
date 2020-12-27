/**
 * Common code for creating standard WMTS layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: id, tileGrid options, source options, extent
 * sources requiring special parameters/functions do not use this.
 */

import { WMTSTileGrid, TileLayer, WMTS } from '../../deps.js';

export default function(options) {
  options.sourceOptions.tileGrid = new WMTSTileGrid(options.tileGridOptions);
  return [new TileLayer({
    id: options.id,
    extent: options.extent,
    source: new WMTS(options.sourceOptions)
  })];
}
