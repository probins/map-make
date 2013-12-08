/** 
 * Spanish IGN Topo WMTS
 * http://www.idee.es/web/guest/directorio-de-servicios?p_p_id=DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_tipoServicio=WMTS&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_supertipo=OGC&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_descSrv=VISUALIZACION
 * EPSG:25830
 * FIXME attribution English
 */

var ol = require('ol');
// FIXME
window.Proj4js = require('proj');

var extent = [-87120, 3849419, 770000, 4879828],
    projCode = 'EPSG:25830',
    resolutions = [545978.7734655447 * 0.28E-3, 272989.38678571396 * 0.28E-3, 136494.69339285715 * 0.28E-3,
      68247.34669642858 * 0.28E-3, 34123.67334821425 * 0.28E-3, 17061.836674107144 * 0.28E-3,
      8530.918337053572 * 0.28E-3, 4265.459168526786 * 0.28E-3];
window.Proj4js.defs[projCode] = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';

module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'http://www.ign.es/wmts/mapa-raster?',
        layer: 'MTN',
        matrixSet: 'EPSG:25830',
        projection: projCode,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(extent),
          resolutions: resolutions,
          matrixIds: [9, 10, 11, 12, 13, 14, 15, 16]
        }),
        style: 'default',
        extent: extent,
        attributions: [new ol.Attribution({
          html: 'Map base: &copy; <a href="http://www.ign.es/" target="_blank">' +
              'Instituto Geográfico Nacional de España</a>'
        })]
      }),
      id: 'IGN Mapas'
    })];
  },
  extent: extent,
  projCode: projCode,
  resolutions: resolutions
};
