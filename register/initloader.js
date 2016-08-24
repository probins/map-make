/**
 * Initial bootstrap loader.
 * Injects CSS/JS into <head>, and sets an onload function for loaderpolyfill to:
 * - create System.importModule() as frontend for System.loader.import, which can later
 *   be changed to import() or module script injection or whatever is implemented
 * - bootstrap the map-make module.
 * Sets onload function for css to create the initial spinner
 *
 * The configuration variables determine which package versions etc to load.
 * By default, these are the values in `configVars` below, relative to `baseURL`,
 * which is by default relative to this script. These can be overridden by setting
 * the `data-configVars` attribute in the script tag loading `initloader.js`.
 * This can be used to use different versions of software, or to load, for example, from localhost.
 * For example,
 *   <script data-configVars='{"css":"../another/path/css/map-make.css","baseURL":"./further/path/map-make/lib/"}'
 *       src="../map-make/lib/initloader.js"></script>
 * will set `css` and `baseURL` in `configVars`.
 * Note: relative baseURL uses URL(), so will not work in IE and other old browsers.
 */

(function() {
var configVars = {
  "css": "css/map-make.css",
  "loaderpolyfill": "loaderpolyfill.js",
  "fetchpromise": "https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Promise"
};

var script, head  = document.getElementsByTagName('head')[0];

// baseURL by default relative to this script
var currentScript = document.getElementsByTagName('script')[0];
var baseURL = currentScript.getAttribute('src').replace('initloader.js','');

var localConfig = JSON.parse(currentScript.getAttribute('data-configVars'));
for (var conf in localConfig) {
  switch (conf) {
    case 'css':
      configVars.css = localConfig[conf];
      break;
    case 'baseURL':
      baseURL = localConfig[conf];
      break;
    case 'loaderpolyfill':
      configVars.loaderpolyfill = localConfig[conf];
      break;
    default:
      break;
  }
}
  // relative url, convert to absolute
  if (baseURL.indexOf('.') === 0) {
    baseURL = new URL(baseURL, document.baseURI).href;
  }

  // load configVars.css
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = (configVars.css.indexOf('h') == 0) ?
      configVars.css : baseURL + configVars.css;
  link.onload = function() {
    // create status div
    var statusDiv = document.createElement('div');
    statusDiv.id = 'status';
    // add spinner to it
    statusDiv.innerHTML = '<i class="fa fa-spinner fa-pulse fa-5x"></i>';
    // and add to body
    document.body.appendChild(statusDiv);
  };
  head.appendChild(link);


// load fetch/Promises polyfill if not natively supported
if (!window.Promise || !window.fetch) {
  script  = document.createElement('script');
  script.src = configVars.fetchpromise;
  head.appendChild(script);
}

// load loaderpolyfill, with onload function
window.addEventListener('load', function() {
  script  = document.createElement('script');
  script.src = (configVars.loaderpolyfill.indexOf('h') == 0) ?
      configVars.loaderpolyfill : baseURL + configVars.loaderpolyfill;
  script.onload = initSystem;
  document.body.appendChild(script);
});

function initSystem() {
  var loader = new window.SystemRegisterLoader(document.baseURI);
  System.loader = loader;

  // dependency tree
  var compDir = 'registry/components/', projDir = 'registry/projections/',
        sourceDir = 'registry/sources/', js = '.js';
  var depTree = {
    'map-make.js': ['utils' + js, 'mapDef' + js],
    'measure.js': ['ol' + js],
    'mongo.js': ['ol' + js],
    'olMap.js': ['ol' + js],
    'rasters.js': ['ol' + js, 'olMap' + js, compDir + 'layerswitcher' + js,
        compDir + 'zoom' + js, 'utils' + js],
    'select.js': ['ol' + js, 'olMap' + js, 'vectors' + js],
    'vectors.js': ['ol' + js, 'olMap' + js, compDir + 'layerswitcher' + js,
        'rasters' + js, 'mongo' + js, 'utils' + js]
  };
  // sources
  var sources = ['be/ign/topo', 'ch/topo/pixel', 'cz/zm', 'de/bkg/atlasde',
      'es/icc/topo', 'es/ign/mapas', 'es/ign/mtn', 'gb/os', 'nl/ngr/achter',
      'pt/dgt/sc', 'si/gurs', 'srtm/laea'];
  var projs = ['3812', '21781', '32633', '25832', '25831', '25830', '25830',
      '27700', '28992', '3763', '3912', '3035'];
  sources.forEach(function(s, i) {
    depTree[sourceDir + s + js] = [projDir + projs[i] + js];
  });
  // projections
  var common = 'common' + js;
  depTree[projDir + common] = [projDir + 'proj4' + js];
  projs.splice(5, 1); // remove duplicate 25830
  projs.forEach(function(p) {
    depTree[projDir + p + js] = [projDir + common];
  });
  // components
  ['addlayer', 'center', 'draw', 'featuredisplay', 'geolocation', 'mapdef', 'cursorposition',
      'layerswitcher', 'placesearch', 'popup', 'toolbar', 'tooltip', 'zoom']
    .forEach(function(c) {
      depTree[compDir + c + js] = [compDir + 'component' + js, compDir + c + '.htm' + js];
    });
  depTree[compDir + 'toolbar' + js].push('olMap' + js);
  depTree[compDir + 'toolbar' + js].push(compDir + 'slideout.min' + js);
  ['draw', 'featuredisplay'].forEach(function(c) {
    depTree[compDir + c + js].push('select' + js);
    depTree[compDir + c + js].push(compDir + 'popup' + js);
    depTree[compDir + c + js].push('measure' + js);
  });
  depTree[compDir + 'tooltip' + js].push('measure' + js);
  depTree[compDir + 'tooltip' + js].push('vectors' + js);
  ['addlayer', 'center', 'draw', 'geolocation', 'mapdef', 'layerswitcher', 'placesearch']
    .forEach(function(c) {
      depTree[compDir + c + js].push(compDir + 'toolbar' + js);
    });
  var add = depTree[compDir + 'addlayer' + js];
  add = add.concat(['awesomplete' + js, 'mapDef' + js, 'rasters' + js, 'vectors' + js, 'utils' + js, 'olMap' + js]);

  // set custom property on System for the moment
  System.sourceList = baseURL + sourceDir + 'list.json';

  System.importModule = function(module) {
    // preload dependencies
    var importDeps = function(dep) {
      if (depTree[dep]) {
        depTree[dep].forEach(function(depend) {
          importDeps(depend);
          System.loader.import(baseURL + depend);
        });
      }
    };
    importDeps(module);
    return System.loader.import(baseURL + module);
  };

  // bootstrap load of map-make using SystemJS
  System.importModule('map-make' + js).catch(function(err) {
    console.log(err);
    System.error = true;
    document.body.innerHTML = 'Error reading map-make.js';
    return;
  });
}
})();
