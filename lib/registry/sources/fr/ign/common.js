/**
 * French IGN Cartes WTMS
 * A lot of the layers are free access, without need for an apikey.
 * 
 * https://geoservices.ign.fr/documentation/services/services-geoplateforme/diffusion#70062
 * 
 * https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities
 *
 * EPSG:3857
 */

import getLayers from '../../wmts.js';
import proj from '../../../projections/3857.js';

const extent = [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244];

const options = {
  tileGridOptions: {
    origin: [extent[0], extent[3]]
  },
  sourceOptions: {
    matrixSet: 'PM',
    projection: proj.projCode,
    style: 'normal',
    attributions: 'Map base: &copy; IGN <a href="https://www.geoportail.fr/" target="_blank">IGN</a>'
  }
};

export default {
  // apikey/private should be passed in the options object
  getLayers: function(inOptions) {
    options.tileGridOptions.matrixIds = inOptions.matrixIds;
    options.tileGridOptions.resolutions = inOptions.resolutions;
    inOptions.private = inOptions.private || '';
    options.sourceOptions.url = 'https://data.geopf.fr/' + inOptions.private + 'wmts';
    options.sourceOptions.layer = inOptions.layer;
    options.id = inOptions.id;
    if (inOptions.apikey) {
      options.sourceOptions.tileLoadFunction = function(imageTile, src) {
        imageTile.getImage().src = src + "&apikey=" + inOptions.apikey;
      };
    }
    return getLayers(options);
  },
  extent: extent
};
