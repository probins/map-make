/**
 * Swisstopo WMTS
 * http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml
 * Needs registration, which must be at domain level, and cannot be simply a page;
 * there is however no API key
 * see http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/services/web_services/webaccess.html
 * Code: ch/topo/pixel
 * EPSG:21781
 * FIXME id and attribution English
 */

import getLayers from '../../wmts.js';
import proj from '../../../projections/21781.js';

const extent = [420000, 30000, 900000, 350000],
    resolutions = [500, 250, 100, 50, 20, 10, 5, 2.5, 2];

const options = {
  extent: extent,
  id: 'Swiss Topo',
  sourceOptions: {
    url: 'https://wmts{0-4}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/20151231/21781/{TileMatrix}/{TileRow}/{TileCol}.jpeg',
    layer: 'ch.swisstopo.pixelkarte-farbe',
    matrixSet: '21781',
    projection: proj.projCode,
    style: 'default',
    requestEncoding: 'REST',
    attributions: 'Topomaps &copy; <a target="_blank" href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/services/web_services/webaccess.html">swisstopo</a>'
  },
  tileGridOptions: {
    extent: extent,
    resolutions: resolutions,
    matrixIds: [15, 16, 17, 18, 19, 20, 21, 22, 23]
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
