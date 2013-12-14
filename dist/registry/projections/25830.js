"es6-transpile";
define(
  [],
  function() {
    "use strict";
    var projCode = 'EPSG:25830';
    window.Proj4js = require('proj');
    window.Proj4js.defs[projCode] = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
    module.exports = {projCode: projCode};
  });