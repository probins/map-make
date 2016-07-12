/**
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

var projCode = 'EPSG:25830';
var proj4 = require('https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js');
proj4.defs(projCode, '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
