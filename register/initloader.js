/**
 * Initial bootstrap loader.
 * Injects CSS/JS into <head>, and sets an onload function for loaderpolyfill to:
 * - create System.importModule() as frontend for System.loader.import, which can later
 *   be changed to import() or module script injection or whatever is implemented
 * - bootstrap the map-make module.
 * Sets onload function for fontawesome to create the initial spinner
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
      "loaderpolyfill": "https://github.jspm.io/probins/map-make@master/loaderpolyfill.js"
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
      var base = localConfig[conf];
      // relative url, convert to absolute
      if (base.indexOf('.') === 0) {
        base = new URL(base, document.baseURI).href;
      }
      configVars.systemConfig.baseURL = base;
      break;
    case 'loaderpolyfill':
      configVars.js.heads.loaderpolyfill = localConfig[conf];
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
// loaderpolyfill has an onload function
for (var js in configVars.js.heads) {
  script  = document.createElement('script');
  script.src = configVars.js.heads[js];
  if (js == 'loaderpolyfill') {
    script.onload = initSystem;
  }
  head.appendChild(script);
}

function initSystem() {
  var loader = new window.SystemRegisterLoader(document.baseURI);
  System.loader = loader;

  // dependency tree
  var compDir = 'registry/components/', projDir = 'registry/projections/',
        sourceDir = 'registry/sources/', js = '.js';
  System.depTree = {
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
    System.depTree[sourceDir + s + js] = [projDir + projs[i] + js];
  });
  // projections
  var common = 'common' + js;
  System.depTree[projDir + common] = [projDir + 'proj4' + js];
  projs.splice(5, 1); // remove duplicate 25830
  projs.forEach(function(p) {
    System.depTree[projDir + p + js] = [projDir + common];
  });
  // components
  ['addlayer', 'center', 'draw', 'featuredisplay', 'geolocation', 'mapdef', 'cursorposition',
      'layerswitcher', 'placesearch', 'popup', 'toolbar', 'tooltip', 'zoom']
    .forEach(function(c) {
      System.depTree[compDir + c + js] = [compDir + 'component' + js, compDir + c + '.htm' + js];
    });
  System.depTree[compDir + 'toolbar' + js].push('olMap' + js);
  ['draw', 'featuredisplay'].forEach(function(c) {
    System.depTree[compDir + c + js].push('select' + js);
    System.depTree[compDir + c + js].push(compDir + 'popup' + js);
    System.depTree[compDir + c + js].push('measure' + js);
  });
  System.depTree[compDir + 'tooltip' + js].push('measure' + js);
  System.depTree[compDir + 'tooltip' + js].push('vectors' + js);
  ['addlayer', 'center', 'draw', 'geolocation', 'mapdef', 'layerswitcher', 'placesearch']
    .forEach(function(c) {
      System.depTree[compDir + c + js].push(compDir + 'toolbar' + js);
    });
  var add = System.depTree[compDir + 'addlayer' + js];
  add = add.concat(['awesomplete' + js, 'mapDef' + js, 'rasters' + js, 'vectors' + js, 'utils' + js, 'olMap' + js]);

  // set custom property on System for the moment
  System.sourceList = configVars.systemConfig.baseURL + sourceDir + 'list.json';

  System.importModule = function(module) {
    // preload dependencies
    var importDeps = function(dep) {
      if (System.depTree[dep]) {
        System.depTree[dep].forEach(function(depend) {
          importDeps(depend);
          System.loader.import(configVars.systemConfig.baseURL + depend);
        });
      }
    };
    importDeps(module);
    return System.loader.import(configVars.systemConfig.baseURL + module);
  };

  // bootstrap load of map-make using SystemJS
  System.importModule('map-make' + js).catch(function(err) {
    console.log(err);
    alert('Error reading map-make.js');
    return;
  });
}
})();
