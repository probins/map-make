/**
 * Catalan Topo WMS
 * http://www.icc.cat/eng/Home-ICC/Digital-geoinformation/Online-services-Geoservices/Quick-WMS-WMTS-of-raster-cartography
 * Code: es/icc/topo
 * EPSG:25831
 * does not appear to be accessible via https
 * FIXME id and attribution English
 */
import getLayers from '../../wms.js';
import proj from '../../../projections/25831.js';

const extent = [258000, 4485000, 536000, 4752000];
const resolutions = [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25];

const options = {
  id: 'Catalan topos',
  sourceOptions: {
    url: 'http://mapcache.icc.cat/map/bases/service?',
    attributions: 'Cartographic base from <a target="_blank" ' +
          'href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>',
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
