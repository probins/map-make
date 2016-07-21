/**
 * Initial bootstrap loader.
 * Injects CSS/JS into <head>, and sets an onload function for SystemJS to:
 * - set depCache, meta config for handling of proj global and plugin file handling
 * - create System.importModule() as frontend for SystemJS.import, which can later
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
      "systemjs": "https://github.jspm.io/systemjs/systemjs@0.19.23/dist/system.js"
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
  SystemJS.config({
    depCache: {
      'map-make.js': ['utils.js', 'mapDef.js'],
      'rasters.js': ['ol.js', 'olMap.js', 'registry/components/layerswitcher.js', 'registry/components/zoom.js'],
      'vectors.js': ['ol.js', 'olMap.js', 'registry/components/layerswitcher.js', 'rasters.js', 'mongo.js'],
      'mongo.js': ['ol.js'],
      'registry/components/addlayer.js': ['registry/components/addlayer.html',
          'https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.js'],
      'registry/components/geolocation.js': ['registry/components/geolocation.html', 'registry/components/toolbar.js'],
      'registry/components/layerswitcher.js': ['registry/components/layerswitcher.html', 'registry/components/toolbar.js'],
      'registry/components/toolbar.js': ['registry/components/component.js', 'registry/components/toolbar.html', 'olMap.js'],
      'registry/components/zoom.js': ['registry/components/component.js', 'registry/components/zoom.html'],
      'registry/projections/common.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
      'registry/projections/21781.js': ['registry/projections/common.js'],
      'registry/projections/25830.js': ['registry/projections/common.js'],
      'registry/projections/25831.js': ['registry/projections/common.js'],
      'registry/projections/25832.js': ['registry/projections/common.js'],
      'registry/projections/27700.js': ['registry/projections/common.js'],
      'registry/projections/28992.js': ['registry/projections/common.js'],
      'registry/projections/32633.js': ['registry/projections/common.js'],
      'registry/projections/3035.js': ['registry/projections/common.js'],
      'registry/projections/3763.js': ['registry/projections/common.js'],
      'registry/projections/3812.js': ['registry/projections/common.js'],
      'registry/projections/3912.js': ['registry/projections/common.js'],
      'registry/sources/be/ign/topo.js': ['registry/projections/3812.js'],
      'registry/sources/ch/topo/pixel.js': ['registry/projections/21781.js'],
      'registry/sources/cz/zm.js': ['registry/projections/32633.js'],
      'registry/sources/de/bkg/atlasde.js': ['registry/projections/25832.js'],
      'registry/sources/es/icc/topo.js': ['registry/projections/25831.js'],
      'registry/sources/es/ign/mapas.js': ['registry/projections/25830.js'],
      'registry/sources/es/ign/mtn.js': ['registry/projections/25830.js'],
      'registry/sources/gb/os.js': ['registry/projections/27700.js'],
      'registry/sources/nl/ngr/achter.js': ['registry/projections/28992.js'],
      'registry/sources/pt/dgt/sc.js': ['registry/projections/3763.js'],
      'registry/sources/si/gurs.js': ['registry/projections/3912.js'],
      'registry/sources/srtm/laea.js': ['registry/projections/3035.js']
    },
    meta: {
      '*.html': {
        loader: configVars.systemConfig.baseURL + 'plugins/text.js'
      }
    }
  });
  var conf = {}, dir = 'registry/components/';
  ['addlayer', 'center', 'draw', 'featuredisplay', 'mapdef', 'mouseposition',
      'placesearch', 'popup', 'tooltip']
      .forEach(function(c) {
        conf[dir + c + '.js'] = [dir + c + '.html'];
      });
  ['draw.js', 'featuredisplay.js'].forEach(function(c) {
    conf[dir + c].push('select.js');
    conf[dir + c].push('registry/components/popup.js');
    conf[dir + c].push('measure.js');
  });
  conf[dir + 'tooltip.js'].push('measure.js');
  conf[dir + 'draw.js'].push('registry/components/toolbar.js');
  SystemJS.config({
    depCache: conf
  });

  // set custom property on System for the moment
  System.sourceList = configVars.systemConfig.baseURL + 'registry/sources/list.json';

  System.importModule = function(module) {
    return SystemJS.import(configVars.systemConfig.baseURL + module);
  };

  // bootstrap load of map-make using SystemJS
  System.importModule('map-make.js').catch(function(err) {
    console.log(err);
    alert('Error reading map-make.js');
    return;
  });
}
})();
