function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }

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

function componentCallback(e) {
  var imp = e.target.import;
  // add templates to document.body
  var tpls = imp.getElementsByTagName('template');
  for (var i = 0; i < tpls.length; i++) {
    document.body.appendChild(imp.importNode(tpls[i], true));
  }
  // var scripts = imp.scripts;
  // var errFunc = function(err) { setTimeout(function() { throw err; }); };
  // for (var i = 0; i < scripts.length; i++) {
  //   var script = scripts[i];
  //   if (script.type == 'module') {
  //     var source = script.innerHTML.substr(1);
  //     System.module(source)
  //     .catch(errFunc);
  //   }
  // }
}


module.exports = {
  $: $,
  $$: $$,

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
