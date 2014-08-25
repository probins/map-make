/** 
 * EPSG:3812
 * Belgian Lambert Conic, GRS80
 */

var projCode = 'EPSG:3812';
// FIXME
window.proj4 = require('proj4');
window.proj4.defs(projCode, "+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 +lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +units=m +no_defs");

module.exports = {
  projCode: projCode
};
