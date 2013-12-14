"es6-transpile";
define(
  [],
  function() {
    "use strict";
    module.exports = function(name, url, fetch, callback, errback) {
      fetch(url, function(source) {
        callback(source + "Proj4js.defs['EPSG:3857']=Proj4js.defs['EPSG:3785'];module.exports=Proj4js;");
      }, errback);
    };
  });