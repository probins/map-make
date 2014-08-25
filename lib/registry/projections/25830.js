/** 
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

var projCode = 'EPSG:25830';
window.proj4 = require('proj4');
window.proj4.defs(projCode, '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
