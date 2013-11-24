/** 
 * Spanish IGN MTN WMS
 * EPSG:23030
 * http://www.idee.es/web/guest/directorio-de-servicios?p_p_id=DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_tipoServicio=WMS&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_supertipo=OGC&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_descSrv=VISUALIZACION
 */

var ol = require('ol');
// FIXME
window.Proj4js = require('proj');

var extent = [-100000, 3950000, 1150000, 4900000],
    projCode = 'EPSG:23030';
window.Proj4js.defs[projCode] = '+proj=utm +zone=30 +ellps=intl +towgs84=-131,-100.3,-163.4,-1.244,-0.020,-1.144,9.39 +units=m +no_defs ';
module.exports = {
  getLayers: function() {
    // FIXME id and attribution fixed in English
    return [new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster',
        attributions: [new ol.Attribution({
          html: 'Cartographic base &copy; <a target="_blank" ' +
              'href="http://www.idee.es/">Instituto Geográfico Nacional de España</a>'
        })],
        params: {
          'LAYERS': 'mtn_rasterizado'
        },
        extent: extent,
        projection: projCode
      }),
      id: 'IGN topos'
    })];
  },
  extent: extent,
  projCode: projCode,
  resolutions: [1800,900,450,225,120,50,25,10,4.5,3,2,1,0.5]
};
