/**
 * OpenStreetMap
 * Code: osm/osm
 * EPSG:3857
 * FIXME: attribution fixed in English
 */
import ol from '../../../ext/ol.js';
export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attributions: 'Map base © <a target="_blank" ' +
            'href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
      id: 'OpenStreetMap'
    })];
  }
};
