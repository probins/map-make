/**
 * Initial bootstrap loader.
 *
 * Loads fetch/Promises polyfill if not natively supported.
 * Injects CSS into <head>, with onload function to create 'loading' spinner.
 * Sets a REGISTER flag set to false if module scripts supported.
 * Sets a window onload function which runs initSystem(); if REGISTER, first
 *   load loaderpolyfill.
 * initSystem:
 * - create module dependency tree for pre-loading dependencies
 * - create System.loader.import(), where loader is:
 *   - either instance of SystemRegisterLoader if REGISTER
 *   - or {} with import() as function dynamically creating module scripts if not
 * - create System.importModule() as frontend for System.loader.import, first
 *     importing dependencies
 * - bootstrap the map-make module, either from this repo if module scripts supported,
 *   or from map-make-register if not.
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
 *
 * This file is always loaded from master, but all other files are by default loaded from
 * the version represented by the 'tag' or 'registerTag' in configVars. This is
 * to enable updating the code whilst not having to update the html link for this
 * bootstrap. So when a new version of map-make/map-make-register is released,
 * 'tag'/'registerTag' should be changed in this file.
 */

(function() {
  // FIXME needs to test support for module scripts so can load from ES2015
  var REGISTER = true;

  // default config
  var configVars = {
    tag: '1.1.1',
    registerTag: '1.1.2',
    // can also be absolute url
    css: 'css/map-make.css',
    // can also be absolute url
    loaderpolyfill: 'loaderpolyfill.js',
    fetchpromise: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Promise,URL',
    sourcesList: '../lib/registry/sources/list.json'
  };

  var script, fragment = document.createDocumentFragment();

  // baseURL by default relative to this script
  var currentScript = document.getElementsByTagName('script')[0];
  var src = currentScript.getAttribute('src');
  var baseURL = src.substring(0, src.lastIndexOf('/') + 1);

  var localConfig = JSON.parse(currentScript.getAttribute('data-configVars'));
  for (var conf in localConfig) {
    switch (conf) {
      case 'registerTag':
        configVars.registerTag = localConfig[conf];
        break;
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
  // if master, use tagged commit and cdn.rawgit instead
  if (baseURL.indexOf('master') !== -1) {
    baseURL = baseURL.replace('master', configVars.tag);
    baseURL = baseURL.replace('rawgit', 'cdn.rawgit');
  }

  // load configVars.css from map-make (no need for separate register version)
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  // if configVars.css not absolute url, prepend baseURL
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
  fragment.appendChild(link);

  // load fetch/Promises polyfill if not natively supported
  if (!window.Promise || !window.fetch) {
    script  = document.createElement('script');
    script.src = configVars.fetchpromise;
    fragment.appendChild(script);
  }

  document.head.appendChild(fragment);

  if (REGISTER) {
    // System.register version in separate repo; use registerTag instead of master
    baseURL = baseURL.replace('map-make', 'map-make-register').replace(configVars.tag, configVars.registerTag);
  }

  // call initSystem() on window.load
  window.addEventListener('load', function() {
    if (REGISTER) {
      // load loaderpolyfill
      script  = document.createElement('script');
      // if configVars.loaderpolyfill not absolute url, prepend baseURL
      script.src = (configVars.loaderpolyfill.indexOf('h') == 0) ?
          configVars.loaderpolyfill : baseURL + configVars.loaderpolyfill;
      script.onload = initSystem;
      document.body.appendChild(script);
    } else {
      // module script, so no polyfill
      initSystem();
    }
  });

  function createDepTree() {
    // create dependency tree
    var regDir = 'registry/';
    var compDir = regDir + 'components/', projDir = regDir + 'projections/',
        sourceDir = regDir + 'sources/', js = '.js';
    var depTree = {
      'map-make.js': ['utils' + js, 'mapDef' + js, 'ol' + js, 'olMap' + js],
      'rasters.js': [compDir + 'layerswitcher' + js, compDir + 'zoom' + js],
      'select.js': ['vectors' + js],
      'vectors.js': [compDir + 'layerswitcher' + js, 'rasters' + js, 'mongo' + js]
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
    add = add.concat(['awesomplete' + js, 'rasters' + js, 'vectors' + js]);
    return depTree;
  }

  function initSystem() {
    // create import(); in System.loader for now
    if (REGISTER) {
      // initiate SystemRegisterLoader
      var loader = new window.SystemRegisterLoader();
      System.loader = loader;
    } else {
      // module script
      window.System = window.System || {};
      System.loader = {
        'import': function(module) {
          return new Promise(function(resolve, reject) {
            script  = document.createElement('script');
            script.type = 'module';
            script.src = module;
            script.addEventListener('load', load, false);
            script.addEventListener('error', error, false);
            document.head.appendChild(script);
            function load() {
              resolve();
              cleanup();
            }
            function error() {
              cleanup();
              reject(new Error('Loading ' + module));
            }
            function cleanup() {
              script.removeEventListener('load', load, false);
              script.removeEventListener('error', error, false);
              document.head.removeChild(script);
            }
          });
        }
      };
    }

    var depTree = createDepTree();

    // set custom property on System for the moment
    System.sourceList = baseURL.replace('-register', '') + configVars.sourcesList;

    // create function to load module and ...
    System.importModule = function(module) {
      // ... preload dependencies
      // FIXME better to create one inline script importing all deps at once
      // rather than recursively update the DOM
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

    // bootstrap load of map-make module
    System.importModule('map-make.js').catch(function(err) {
      console.log(err);
      System.error = true;
      document.body.innerHTML = 'Error reading map-make.js';
      return;
    });
  }
})();
