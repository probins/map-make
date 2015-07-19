/** 
 * EPSG:3912
 * Slovenian Transverse Mercator, Bessel ellipsoid
 */

var projCode = 'EPSG:3912';
var proj4 = require('proj4');
proj4.defs(projCode, "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9999 +x_0=500000 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs");

module.exports = {
  projCode: projCode
};
