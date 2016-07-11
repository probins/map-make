/** Rasters are defined from registry scripts, one for each source/layer.
 * - each raster defines the projection/resolutions/extent for that source
 * - a different view is created for each projection
 * - only 1 raster can currently be displayed at one time
 * Options are set in mapDef, in querystring, or in the slideout menu.
 * valid options are:
 * - map options:
 * -- components: currently mouseposition, tooltip, featuredisplay, center, draw;
 *    a layerswitcher is always included
 * - layers options:
 * -- rasters: an array listing raster ids
 *    ids are defined in the registry scripts, included with a script tag,
 *    so each raster id should have a corresponding script.
 * -- vectors: an array of objects with the following options:
 * --- url
 * --- format (should be the name of the ol class: GeoJSON, KML, GPX ...;
 *     by default, the file extension will be used)
 * --- attribution
 * --- optionally, style can be given to override defaults
 * - view options:
 * -- initial center {lat: nn.nn, lon: nn.nn} and zoom level
 *    By default maps with vectors zoom to the vector data
 *    and maps with no vectors zoom to the extent of the tile data
 * -- rotation
 * -- if no rasters, projCode can be set, else 4326 used
 */

/** controller module; loaded with and uses System
 * uses System global
 * - sets meta config for handling of ol/proj globals and html file handling
 * - uses System.import()
 * uses Promise, including Promise.all for multi-imports
 * uses json and text plugins
 * imports mapDef, which sets depCache config, and calls mapDef.init() to fetch if wanted
 * imports rasters/vectors, sources/components from registry
 * - calls rasters/vectors.addInitial() to add layers to map
 * at end,
 * - hides status div if not waiting for zoom to data extent
 * - displays slideout toolbar if no map to display
 */

var utils = require('./utils.js');
var $ = utils.$;
var mapDef = require('./mapDef.js');

// literal vars
var errors = utils.errors;

System.config({
  paths: {
    json: System.base + 'plugins/json.js',
    text: System.base + 'plugins/text.js'
  },
  meta: {
    'ol.js': {
      format: 'global',
      exports: 'ol'
    },
    proj4: {
      format: 'global',
      exports: 'proj4'
    },
    '*.html': {
      loader: 'text'
    },
    '*.json': {
      loader: 'json'
    }
  }
});

var options;

// get options, fetching mapDef if necessary
mapDef.init().then(function(opts) {
// and if no options, will display empty map with default 4326 view
  options = opts;
// now we have options, fetch modules specified

  // import raster/style modules from registry based on options
  if (options.rasters) {
    var imports = [System.import(System.base + 'rasters.js')], modName;
    // assemble array of raster modules to import
    options.rasters.forEach(function(r) {
      // raster option can be object with apikey
      if (typeof r === 'object') {
        modName = Object.keys(r)[0]; // only 1
      // ... or string
      } else {
        modName = r;
      }
      imports.push(System.import(System.base + 'registry/sources/' + modName + '.js'));
    });
    // fetch raster modules
    return Promise.all(imports);
  }
}, errors.noMapDef).then(function(importeds) {
  // now we have the raster modules, add layers/sources
  if (importeds) {
    // rasters module is 1st in array
    var rasters = importeds.shift();
    rasters.addInitial(importeds, options);
  }
}, errors.rasters).then(function() {
  if (options.vectors) {
    // add vector layers/sources
    return System.import(System.base + 'vectors.js').then(function(vectors) {
      vectors.addInitial(options);
    });
  }
}, errors.vectors).then(function(v) {
  // add components
  // these are also in modules but don't have to be loaded in sequence.
  // They add themselves to the map, so can simply be imported in a for loop
  if (options.components) {
  //   for (var component in options.components) {
    options.components.forEach(function(c) {
      System.import(System.base + 'registry/components/' + c + '.js');
    });
  }

  if (!options.vectors || (options.center || options.zoom)) {
    // hide status div if not waiting for zoom to data extent
    $('#status').style.display = 'none';
  }
  // if (!options.noKeyboardPan) {
  //   // set focus to enable keyboard pan/zoom
  //   olMap.setFocus();
  // }

  // no map to display, so display toolbar
  if (!options.rasters && !options.vectors) {
    System.import(System.base + 'registry/components/toolbar.js').then(function() {
      $('#slide-toggle').dispatchEvent(new MouseEvent('click'));
    });
  }
}, errors.components);
