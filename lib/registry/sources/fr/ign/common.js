/**
 * French IGN Cartes WTMS
 * Free service, but needs an apikey for the URL and layers accessed;
 * see http://professionnels.ign.fr/licence-api-geoportail-libre-et-gratuite
 *
 * http://wxs.ign.fr/<api key>/wmts?SERVICE=WMTS&REQUEST=GetCapabilities
 *
 * EPSG:3857
 */

import getLayers from '../../wmts.js';
import proj from '../../../projections/3857.js';

const projCode = 'EPSG:3857',
    extent = [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244];

const options = {
  tileGridOptions: {
    origin: [extent[0], extent[3]]
  },
    sourceOptions: {
    matrixSet: 'PM',
    projection: projCode,
    style: 'normal',
    attributions: 'Map base: &copy; IGN <a href="https://www.geoportail.fr/" target="_blank">IGN</a>'
  }
};

export default {
  // apikey should be passed in the options object
  getLayers: function(inOptions) {
    options.tileGridOptions.matrixIds = inOptions.matrixIds;
    options.tileGridOptions.resolutions = inOptions.resolutions;
    options.sourceOptions.url = 'https://wxs.ign.fr/' + inOptions.apikey + '/wmts';
    options.sourceOptions.layer = inOptions.layer;
    return getLayers(options);
  },
  projCode: proj.projCode,
  extent: extent
};
