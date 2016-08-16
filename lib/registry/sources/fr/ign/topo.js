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

var ol = require('../../../../ol.js').default;

var projCode = 'EPSG:3857',
    extent = [-20037508.342789244, -20037508.342789244, 20037508.342789244,
      20037508.342789244],
    resolutions = [4891.96981025128, 2445.98490512564,
      1222.99245256282, 611.49622628141, 305.7481131407048, 152.8740565703525,
      76.43702828517624, 38.21851414258813, 19.10925707129406, 9.554628535647032,
      4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395];
module.exports = {
  // apikey should be passed in the options object
  getLayers: function(options) {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'https://wxs.ign.fr/' + options.apikey + '/wmts',
        layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
        matrixSet: 'PM',
        projection: projCode,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(extent),
          resolutions: resolutions,
          matrixIds: [5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        }),
        style: 'normal',
        attributions: 'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank">' +
              '<img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>' +
              '<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf"' +
              'alt="TOS" title="TOS" target="_blank">Terms of Service</a>'
      }),
      id: 'IGN Maps'
    })];
  },
  extent: extent,
  projCode: projCode,
  resolutions: resolutions
};
