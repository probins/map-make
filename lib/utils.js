function $(s) { return document.getElementById(s) }

var errors = {
      error: function(err, msg) {
        console.log(err);
        alert(msg);
        return;
      },

      // FIXME English
      fetchFail: function(err) {
        errors.error(err, 'File fetch failed');
        return;
      },
      noForm: function(err) {
        errors.error(err, 'Unable to load form');
        return;
      },
      noMap: function(err) {
        errors.error(err, 'Unable to load olMap/css');
        return;
      },
      noMapDef: function(err) {
        errors.error(err, 'Unable to load mapDef');
        return;
      },
      rasters: function(err) {
        errors.error(err, 'Unable to load raster module(s)');
        return;
      },
      vectors: function(err) {
        errors.error(err, 'Unable to load style module(s)');
        return;
      },
      widgets: function(err) {
        errors.error(err, 'Unable to load widget module(s)');
        return;
      }
};

module.exports = {
  $: $,

  importComponent: function(element, href) {
    var frag = document.createDocumentFragment();
    var link = document.createElement('link');
    link.rel = 'import';
    link.href = href;
    link.id = element + 'link';
    link.addEventListener('load', System.componentCallback);
    frag.appendChild(link);
    document.head.appendChild(frag);
  },

  // Promise-based XHR (from http://www.html5rocks.com/en/tutorials/es6/promises/)
  // Replace with fetch()?
  httpGet: function (url) {
  return new Promise(
    function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status == 200) {
          // success: resolve the promise with the response text
          var response;
          // parse JSON if needed
          if (req.getResponseHeader('content-type').indexOf('application/json') != -1) {
            response = JSON.parse(req.response);
          } else {
            response = req.response;
          }
          resolve(response);
        }
        else {
          // Otherwise reject with the status text
          reject(Error(req.statusText));
        }
      };
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
  });
},

errors: errors
};
