/**
 * Common code for creating standard WMS layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: id, tileGrid options, source options
 * sources requiring special parameters/functions do not use this.
 */

import { ol } from '../../deps.js';

export default function(options) {
  options.sourceOptions.tileGrid = new ol.tilegrid.TileGrid(options.tileGridOptions);
  return [new ol.layer.Tile({
    id: options.id,
    source: new ol.source.TileWMS(options.sourceOptions)
  })];
};