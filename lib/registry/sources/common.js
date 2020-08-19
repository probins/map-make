/**
 * Common code for creating standard WMS/WMTS/XYZ layers/sources, imported by sources/xx.js
 * Interfaces with ol module and returns standard function with options parameter.
 * options are: type (WMS/WMTS/XYZ), id, tileGrid options, source options, extent (WMTS)
 * sources requiring special parameters/functions do not use this.
 */

import ol from '../../ext/ol.js';

export default function(options) {
  switch (options.type) {
    case 'WMS':
      options.sourceOptions.tileGrid = new ol.tilegrid.TileGrid(options.tileGridOptions);
      return [new ol.layer.Tile({
        id: options.id,
        source: new ol.source.TileWMS(options.sourceOptions)
      })];
    case 'WMTS':
      options.sourceOptions.tileGrid = new ol.tilegrid.WMTS(options.tileGridOptions);
      return [new ol.layer.Tile({
        id: options.id,
        extent: options.extent,
        source: new ol.source.WMTS(options.sourceOptions)
      })];
    case 'XYZ':
      if (options.tileGridOptions) {
        options.sourceOptions.tileGrid = new ol.tilegrid.TileGrid(options.tileGridOptions);
      }
      return [new ol.layer.Tile({
        id: options.id,
        source: new ol.source.XYZ(options.sourceOptions)
      })];
    default:
      console.log(`Only caters for WMS/WMTS/XYZ`);
  }
}
