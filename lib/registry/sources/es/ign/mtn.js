/**
 * Spanish IGN MTN WMS
 * http://www.ign.es/wms-inspire/mapa-raster?request=GetCapabilities&service=WMS
 * Code: es/ign/mtn
 * EPSG:25830
 * does not appear to be accessible via https
 * FIXME attribution/id English
 */

import getLayers from '../../wms.js';
import proj from '../../../projections/25830.js';

const extent = [-100000, 3950000, 1150000, 4870000];
const resolutions = [1800, 900, 450, 225, 120, 50, 25, 10, 4.5, 3, 2, 1, 0.5];

const options = {
  id: 'IGN topos',
  sourceOptions: {
    url: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster',
    attributions: 'Cartographic base &copy; <a target="_blank" ' +
          'href="http://www.idee.es/">Instituto Geográfico Nacional de España</a>',
    params: {
      'LAYERS': 'mtn_rasterizado'
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



// export default {
//   getLayers: function() {
//     // FIXME id and attribution fixed in English
//     return [new ol.layer.Tile({
//       source: new ol.source.TileWMS({
//         url: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster',
//         attributions: 'Cartographic base &copy; <a target="_blank" ' +
//               'href="http://www.idee.es/">Instituto Geográfico Nacional de España</a>',
//         params: {
//           'LAYERS': 'mtn_rasterizado'
//         },
//         tileGrid: new ol.tilegrid.TileGrid({
//           resolutions: resolutions,
//           extent: extent
//         }),
//         projection: proj.projCode
//       }),
//       id: 'IGN topos'
//     })];
//   },
//   extent: extent,
//   projCode: proj.projCode,
//   resolutions: resolutions
// };
