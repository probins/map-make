/**
 * Initial bootstrap loader.
 *
 * Injects CSS into <head>, with onload function to create 'loading' spinner.
 * Sets a window onload function which runs initSystem()
 * initSystem:
 * - create module dependency tree for pre-loading dependencies (currently commented out)
 * - bootstrap the map-make module.
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
 *
 * This file is always loaded from master, but all other files are by default loaded from
 * the version represented by the 'tag' in configVars. This is to enable updating
 * the code without having to update the html link for this bootstrap.
 * So when a new version of map-make is released, 'tag' should be changed in this file.
 */

(function() {
  // default config
  let configVars = {
    tag: '1.3.0',
    // can also be absolute url
    css: 'css/map-make.css'
  };

  let script, fragment = document.createDocumentFragment();

  // baseURL by default relative to this script
  let currentScript = document.getElementsByTagName('script')[0];
  let src = currentScript.getAttribute('src');
  let baseURL = src.substring(0, src.lastIndexOf('/') + 1);

  let localConfig = JSON.parse(currentScript.getAttribute('data-configVars'));
  for (let conf in localConfig) {
    switch (conf) {
      case 'css':
        configVars.css = localConfig[conf];
        break;
      case 'baseURL':
        baseURL = localConfig[conf];
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
//    baseURL = baseURL.replace('rawgit', 'cdn.rawgit');
  }

  // load configVars.css from map-make
  let link  = document.createElement('link');
  link.rel  = 'stylesheet';
  // if configVars.css not absolute url, prepend baseURL
  link.href = (configVars.css.indexOf('h') == 0) ?
      configVars.css : baseURL + configVars.css;
  link.onload = function() {
    // create status div
    let statusDiv = document.createElement('div');
    statusDiv.id = 'status';
    // add spinner to it
    statusDiv.innerHTML = '<i class="fa fa-spinner fa-pulse fa-5x"></i>';
    // and add to body
    document.body.appendChild(statusDiv);
  };
  fragment.appendChild(link);

  document.head.appendChild(fragment);

  // call initSystem() on window.load
  window.addEventListener('load', function() {
    initSystem();
  });

  // function createDepTree() {
  //   // create dependency tree
  //   let regDir = 'registry/';
  //   let compDir = regDir + 'components/', projDir = regDir + 'projections/',
  //       sourceDir = regDir + 'sources/', js = '.js';
  //   let depTree = {
  //     'map-make.js': ['utils' + js, 'mapDef' + js, 'ol' + js, 'olMap' + js],
  //     'rasters.js': [compDir + 'layerswitcher' + js, compDir + 'zoom' + js],
  //     'select.js': ['vectors' + js],
  //     'vectors.js': [compDir + 'layerswitcher' + js, 'rasters' + js, 'mongo' + js]
  //   };
  //   // sources
  //   let sources = ['be/ign/topo', 'ch/topo/pixel', 'cz/zm', 'de/bkg/atlasde',
  //       'es/icc/topo', 'es/ign/mapas', 'es/ign/mtn', 'gb/os', 'nl/ngr/achter',
  //       'pt/dgt/sc', 'si/gurs', 'srtm/laea'];
  //   let projs = ['3812', '21781', '32633', '25832', '25831', '25830', '25830',
  //       '27700', '28992', '3763', '3912', '3035'];
  //   sources.forEach(function(s, i) {
  //     depTree[sourceDir + s + js] = [projDir + projs[i] + js];
  //   });
  //   // projections
  //   let common = 'common' + js;
  //   depTree[projDir + common] = [projDir + 'proj4' + js];
  //   projs.splice(5, 1); // remove duplicate 25830
  //   projs.forEach(function(p) {
  //     depTree[projDir + p + js] = [projDir + common];
  //   });
  //   // components
  //   ['addlayer', 'center', 'draw', 'featuredisplay', 'geolocation', 'mapdef', 'cursorposition',
  //       'layerswitcher', 'placesearch', 'popup', 'toolbar', 'tooltip', 'zoom']
  //     .forEach(function(c) {
  //       depTree[compDir + c + js] = [compDir + 'component' + js, compDir + c + '.htm' + js];
  //     });
  //   depTree[compDir + 'toolbar' + js].push(compDir + 'slideout.min' + js);
  //   ['draw', 'featuredisplay'].forEach(function(c) {
  //     depTree[compDir + c + js].push('select' + js);
  //     depTree[compDir + c + js].push(compDir + 'popup' + js);
  //     depTree[compDir + c + js].push('measure' + js);
  //   });
  //   depTree[compDir + 'tooltip' + js].push('measure' + js);
  //   depTree[compDir + 'tooltip' + js].push('vectors' + js);
  //   ['addlayer', 'center', 'draw', 'geolocation', 'mapdef', 'layerswitcher', 'placesearch']
  //     .forEach(function(c) {
  //       depTree[compDir + c + js].push(compDir + 'toolbar' + js);
  //     });
  //   let add = depTree[compDir + 'addlayer' + js];
  //   add = add.concat(['awesomplete' + js, 'rasters' + js, 'vectors' + js]);
  //   return depTree;
  // }

  function initSystem() {
    // let depTree = createDepTree();

  //     // ... preload dependencies
  //     // FIXME better to create one inline script importing all deps at once
  //     // rather than recursively update the DOM
  //     let importDeps = function(dep) {
  //       if (depTree[dep]) {
  //         depTree[dep].forEach(function(depend) {
  //           importDeps(depend);
  //           import(baseURL + depend);
  //         });
  //       }
  //     };
  //     importDeps(module);

  //   // bootstrap load of map-make module
    import('./map-make.js').catch(err => {
      console.log(err);
      document.body.innerHTML = 'Error reading map-make.js';
      return;
    });
  }
})();
