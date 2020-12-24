/**
 * OpenStreetMap
 * Code: osm/osm
 * EPSG:3857
 * FIXME: attribution fixed in English
 */
import getLayers from '../xyz.js';
import proj from '../../projections/3857.js';

const options = {
  id: 'OpenStreetMap',
  sourceOptions: {
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attributions: 'Map base © <a target="_blank" ' +
        'href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
};

export default {
  getLayers: function() {
    return getLayers(options);
  }
};
