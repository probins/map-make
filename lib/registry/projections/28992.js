/**
 * EPSG:28992
 * Dutch Oblique Stereographic projection, Bessel ellipsoid
 */

var projCode = 'EPSG:28992';
var projDef = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs';

require('./common.js').addProjection(projCode, projDef);

module.exports = {
  projCode: projCode
};
