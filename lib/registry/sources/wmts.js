/**
 * Common code for creating standard WMTS layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: id, tileGrid options, source options, extent
 * sources requiring special parameters/functions do not use this.
 */

import { ol } from '../../deps.js';

export default function(options) {
  options.sourceOptions.tileGrid = new ol.tilegrid.WMTS(options.tileGridOptions);
  return [new ol.layer.Tile({
    id: options.id,
    extent: options.extent,
    source: new ol.source.WMTS(options.sourceOptions)
  })];
}
