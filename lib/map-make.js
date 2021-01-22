/** Rasters are defined from registry scripts, one for each source/layer.
 * - each raster defines the projection/resolutions/extent for that source
 * - a different view is created for each projection
 * - only 1 raster can currently be displayed at one time
 * Options are set in mapDef, in querystring, or in the slideout menu.
 * valid options are:
 * - map options:
 * -- components: currently cursorposition, tooltip, featuredisplay, center, draw;
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

/** controller module
 * uses Promise, including Promise.all for multi-imports
 * imports mapDef, which sets depCache config, and calls mapDef.init() to fetch if wanted
 * imports rasters/vectors, sources/components from registry
 * - calls rasters/vectors.addInitial() to add layers to map
 * at end,
 * - hides status div if not waiting for zoom to data extent
 * - displays slideout toolbar if no map to display
 */

import { $, errors } from './utils.js';
import mapDef from './mapDef.js';

let options;

// get options, fetching mapDef if necessary
mapDef.init().then(opts => {
// and if no options, will display empty map with default 4326 view
  options = opts;
// now we have options, fetch modules specified

  // import raster/style modules from registry based on options
  if (options.rasters) {
    const imports = [import('./rasters.js')];
    let modName;
    // assemble array of raster modules to import
    options.rasters.forEach(r => {
      // raster option can be object with apikey
      if (typeof r === 'object') {
        modName = Object.keys(r)[0]; // only 1
      // ... or string
      } else {
        modName = r;
      }
      imports.push(import('./registry/sources/' + modName + '.js'));
    });
    // fetch raster modules
    return Promise.all(imports);
  }
}, errors.noMapDef).then(importeds => {
  // now we have the raster modules, add layers/sources
  if (importeds) {
    // rasters module is 1st in array
    const rasters = importeds.shift();
    rasters.default.addInitial(importeds, options);
  }
}, errors.rasters).then(() => {
  if (options.vectors) {
    // add vector layers/sources
    return import('./vectors.js').then(vectors => vectors.default.addInitial(options));
  }
}, errors.vectors).then(v => {
  // add components
  // these are also in modules but don't have to be loaded in sequence.
  // They add themselves to the map, so can simply be imported in a for loop
  if (options.components) {
    options.components.forEach(c => import('./registry/components/' + c + '.js'));
  }

  // if (!options.noKeyboardPan) {
  //   // set focus to enable keyboard pan/zoom
  //   olMap.setFocus();
  // }

  // no map to display, so display toolbar
  if (!options.rasters && !options.vectors) {
    import('./registry/components/toolbar.js')
    .then(() => $('#slide-toggle').dispatchEvent(new MouseEvent('click')))
    .catch(err => console.log(err));
  }
}, errors.components).then(() => {
  if (!options.vectors || (options.center || options.zoom)) {
    // hide status div if not waiting for zoom to data extent
    $('#status').style.display = 'none';
  }
});
