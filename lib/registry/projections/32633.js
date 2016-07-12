/**
 * EPSG:32633
 * UTM zone 33 on WGS84
 */

var projCode = 'EPSG:32633';
var proj4 = require('https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js');
proj4.defs(projCode, '+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
