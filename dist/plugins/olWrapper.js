"es6-transpile";
define(
  [],
  function() {
    "use strict";
    module.exports = function(name, url, fetch, callback, errback) {
      fetch(url, function(source) {
        callback(source + "module.exports=ol;");
      }, errback);
    };
  });