/**
 * Catalan Topo WMS
 * https://www.icgc.cat/en/Public-Administration-and-Enterprises/Services/Online-services-Geoservices/WMS-and-tiles-Reference-cartography
 * Code: es/icc/topo
 * EPSG:25831
 * FIXME id and attribution English
 */
import getLayers from '../../wms.js';
import proj from '../../../projections/25831.js';

const extent = [258000, 4485000, 536000, 4752000];
const resolutions = [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25];

const options = {
  id: 'Catalan topos',
  sourceOptions: {
    url: 'https://geoserveis.icgc.cat/map/bases/service?',
    attributions: 'Cartographic base from <a target="_blank" ' +
          'href="https://www.icgc.cat/">Institut Cartogràfic de Catalunya</a>',
    params: {
      'VERSION': '1.1.1',
      'LAYERS': 'topo'
    },
    projection: proj.projCode
  },
  tileGridOptions: {
    resolutions: resolutions,
    extent: extent
  }
};

export default {
  getLayers: function() {
    return getLayers(options);
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
