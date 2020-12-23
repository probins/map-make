/**
 * French IGN Cartes WTMS
 * Free service, but needs an apikey for the URL and layers accessed;
 * see http://professionnels.ign.fr/licence-api-geoportail-libre-et-gratuite
 *
 * http://wxs.ign.fr/<api key>/wmts?SERVICE=WMTS&REQUEST=GetCapabilities
 *
 * Code: fr/ign/topo
 * EPSG:3857
 * FIXME id and attribution English
 */

import { ol } from '../../../../deps.js';
import proj from '../../../projections/3857.js';

const projCode = 'EPSG:3857',
    extent = [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244];

let tileGridOptions = {
  origin: [extent[0], extent[3]]
};

let sourceOptions = {
  matrixSet: 'PM',
  projection: projCode,
  style: 'normal',
  attributions: 'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank">' +
        '<img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>' +
        '<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf"' +
        'alt="TOS" title="TOS" target="_blank">Terms of Service</a>'
};

export default {
  // apikey should be passed in the options object
  getLayers: function(inOptions) {
    tileGridOptions.matrixIds = inOptions.matrixIds;
    tileGridOptions.resolutions = inOptions.resolutions;
    sourceOptions.tileGrid = new ol.tilegrid.WMTS(tileGridOptions);
    sourceOptions.url = 'https://wxs.ign.fr/' + inOptions.apikey + '/wmts';
    sourceOptions.layer = inOptions.layer;
    return [new ol.layer.Tile({
      source: new ol.source.WMTS(sourceOptions),
      id: inOptions.id
    })];
  },
  projCode: proj.projCode,
  extent: extent
};
