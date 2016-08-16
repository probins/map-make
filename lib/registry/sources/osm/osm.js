/**
 * OpenStreetMap
 * Code: osm/osm
 * EPSG:3857
 * FIXME: attribution fixed in English
 */
import ol from '../../../ol.js';
export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.OSM(),
      id: 'OpenStreetMap'
    })];
  }
};
