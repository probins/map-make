/**
 * Initial bootstrap loader.
 * Injects CSS/JS into <head>, and sets an onload function for SystemJS to
 * create the initial spinner and bootstrap the map-make code.
 *
 * The configuration variables determine which package versions etc to load.
 * By default, these are the values in `configVars` below, but these can be
 * overridden by setting the `data-configVars` attribute in the script tag loading
 * `initloader.js`. This can be used to use different versions of software,
 * or to load, for example, from localhost.
 * For example,
 *   <script data-configVars='{"map-make":"../map-make/lib/css/map-make.css","baseURL":"../map-make/lib/"}'
 *       src="../map-make/lib/initloader.js"></script>
 * will set `css/map-make` and `systemConfig/baseURL` in `configVars`.
 */

(function() {
var configVars = {
  "css": {
    "fontawesome": "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css",
    "map-make": "https://github.jspm.io/probins/map-make/css/map-make.css"
  },
  "js": {
    "heads": {
      "slideout": "https://cdnjs.cloudflare.com/ajax/libs/slideout/0.1.9/slideout.min.js",
      "systemjs": "https://github.jspm.io/systemjs/systemjs@0.19.9/dist/system.js"
    },
    "fetchpromise": "https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Promise"
  },
  "systemConfig": {
    "baseURL": "https://github.jspm.io/probins/map-make@master/"
  }
};

var script, head  = document.getElementsByTagName('head')[0];

var localConfig = JSON.parse(document.currentScript.getAttribute('data-configVars'));
for (var conf in localConfig) {
  switch (conf) {
    case 'map-make':
      configVars.css['map-make'] = localConfig[conf];
      break;
    case 'baseURL':
      configVars.systemConfig.baseURL = localConfig[conf];
      break;
    default:
      break;
  }
}

function createSpinner() {
  // create initial div for spinner
  var statusDiv = document.createElement('div');
  statusDiv.id = 'status';
  statusDiv.innerHTML = '<i class="fa fa-spinner fa-pulse fa-5x"></i>';
  document.body.appendChild(statusDiv);
}

// load configVars.css entries
for (var css in configVars.css) {
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = configVars.css[css];
  if (css === 'fontawesome') {
    link.onload = createSpinner;
  }
  head.appendChild(link);
}

// load fetch/Promises polyfill if not natively supported
if (!window.Promise || !window.fetch) {
  script  = document.createElement('script');
  script.src = configVars.js.fetchpromise;
  head.appendChild(script);
}

// load configVars.js.heads entries
// SystemJS has an onload function
for (var js in configVars.js.heads) {
  script  = document.createElement('script');
  script.src = configVars.js.heads[js];
  if (js == 'systemjs') {
    script.onload = initSystemjs;
  }
  head.appendChild(script);
}

function initSystemjs() {
  // config SystemJS
  System.config({
    depCache: {
      'map-make.js': ['utils.js', 'mapDef.js']
    }
  });

  // set custom property on System for the moment
  System.base = configVars.systemConfig.baseURL;

  // bootstrap load of map-make using SystemJS
  System.import(System.base + 'map-make.js').catch(function(err) {
    console.log(err);
    alert('Error reading map-make.js');
    return;
  });
}
})();
