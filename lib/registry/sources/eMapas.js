/** 
 * Spanish IGN Topo WMTS
 * http://www.idee.es/web/guest/directorio-de-servicios?p_p_id=DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_tipoServicio=WMTS&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_supertipo=OGC&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_descSrv=VISUALIZACION
 * EPSG:25830
 * FIXME attribution English
 */

var ol = require('ol');
var proj = require('projections/25830');

var extent = [-1079526.585009098, 2450926.618387835, 1462559.4951461395, 5127818.100512035], //[-87120, 3849419, 770000, 4879828],
    resolutions = [8735660.377232144 * 0.28E-3,
      4367830.188616072 * 0.28E-3, 2183915.094308036 * 0.28E-3, 1091957.547154018 * 0.28E-3,
      545978.773577009 * 0.28E-3, 272989.38678571396 * 0.28E-3, 136494.69339285715 * 0.28E-3,
      68247.34669642858 * 0.28E-3, 34123.67334821425 * 0.28E-3, 17061.836674107144 * 0.28E-3,
      8530.918337053572 * 0.28E-3, 4265.459168526786 * 0.28E-3];//2.795411320714286E8 * 0.28E-3,
      //1.397705660357143E8 * 0.28E-3, 6.988528301785715E7 * 0.28E-3, 3.4942641508928575E7 * 0.28E-3, 1.7471320754464287E7 * 0.28E-3, 

// FIXME needed until OL bug fixed
ol.proj.get('EPSG:25830').setExtent(extent);

module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: 'http://www.ign.es/wmts/mapa-raster?',
        layer: 'MTN',
        matrixSet: proj.projCode,
        projection: proj.projCode,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(extent),
          resolutions: resolutions,
          matrixIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        }),
        style: 'default',
        attributions: [new ol.Attribution({
          html: 'Map base: &copy; <a href="http://www.ign.es/" target="_blank">' +
              'Instituto Geográfico Nacional de España</a>'
        })]
      }),
      extent: extent,
      id: 'IGN Mapas'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
