/**
 * Common code for creating standard TileImage layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: id, tileGrid options, source options
 */
// import { TileGrid, TileImage, TileLayer } from '../../deps.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileImage from 'ol/source/TileImage.js';
import TileLayer from 'ol/layer/Tile.js';

export default function(options) {
  options.sourceOptions.tileGrid = new TileGrid(options.tileGridOptions);
  return [new TileLayer({
    id: options.id,
    source: new TileImage(options.sourceOptions)
  })];
}
