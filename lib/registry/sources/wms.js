/**
 * Common code for creating standard WMS layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: id, tileGrid options, source options
 * sources requiring special parameters/functions do not use this.
 */
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';

// import { TileGrid, TileLayer, TileWMS } from '../../deps.js';

export default function(options) {
  options.sourceOptions.tileGrid = new TileGrid(options.tileGridOptions);
  return [new TileLayer({
    id: options.id,
    source: new TileWMS(options.sourceOptions)
  })];
}
