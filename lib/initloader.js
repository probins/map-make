/**
 * Initial bootstrap loader.
 * Injects CSS/JS into <head>, and sets an onload function for SystemJS to
 * create the initial spinner and bootstrap the map-make code.
 *
 * Change the entries in `externals` to load different versions of software, or to
 * load, for example, from localhost.
 */

var externals = {
  "css": {
    "fontawesome": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
    "map-make": "https://github.jspm.io/probins/map-make/css/map-make.css"
  },
  "js": {
    "heads": {
      "slideout": "https://cdnjs.cloudflare.com/ajax/libs/slideout/0.1.9/slideout.min.js",
      "systemjs": "https://github.jspm.io/systemjs/systemjs@0.19.9/dist/system.js"
    },
    "fetch": "https://github.jspm.io/probins/map-make/fetch.min.js",
    "proj4js": "https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js",
    "promise": "https://es6-promises.s3.amazonaws.com/es6-promise-2.0.1.min.js",
  },
  "systemConfig": {
    "baseURL": "https://github.jspm.io/probins/map-make@master/"
  }
};

var script, head  = document.getElementsByTagName('head')[0];

// load externals.css entries
for (var css in externals.css) {
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = externals.css[css];
  head.appendChild(link);
}

// load Promises polyfill if not natively supported
if (!window.Promise) {
  script  = document.createElement('script');
  script.src = externals.js.promise;
  head.appendChild(script);
}
// load fetch polyfill if not natively supported
if (!window.fetch) {
  script  = document.createElement('script');
  script.src = externals.js.fetch;
  head.appendChild(script);
}

// load externals.js.heads entries
// SystemJS has an onload function
for (var js in externals.js.heads) {
  script  = document.createElement('script');
  script.src = externals.js.heads[js];
  if (js == 'systemjs') {
    script.onload = initSystemjs;
  }
  head.appendChild(script);
}

function initSystemjs() {
  // create initial div for spinner
  var statusDiv = document.createElement('div');
  statusDiv.id = 'status';
  statusDiv.innerHTML = '<i class="fa fa-spinner fa-pulse fa-5x"></i>';
  document.body.appendChild(statusDiv);

  // config SystemJS
  System.config({
    baseURL: externals.systemConfig.baseURL,
    paths: {
      '*': '*.js',
      proj4: externals.js.proj4js
    },
    depCache: {
      'map-make': ['utils', 'mapDef']
    }
  });
  // bootstrap load of map-make using SystemJS
  System.import('map-make').catch(function(err) {
    console.log(err);
    alert('Error reading map-make.js');
    return;
  });
}
