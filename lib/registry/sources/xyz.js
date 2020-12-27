/**
 * Common code for creating standard XYZ layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: id, tileGrid options, source options
 * sources requiring special parameters/functions do not use this.
 */

import { TileGrid, TileLayer, XYZ } from '../../deps.js';

export default function(options) {
  if (options.tileGridOptions) {
    options.sourceOptions.tileGrid = new TileGrid(options.tileGridOptions);
  }
  return [new TileLayer({
    id: options.id,
    source: new XYZ(options.sourceOptions)
  })];
}
