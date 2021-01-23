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
 * uses Promise/await, including Promise.all for multi-imports
 * imports mapDef, which sets depCache config, and calls mapDef.init() to fetch if wanted
 * imports rasters/vectors, sources/components from registry
 * - calls rasters/vectors.addInitial() to add layers to map
 * at end,
 * - hides status div if not waiting for zoom to data extent
 * - displays slideout toolbar if no map to display
 */

import { $, errors } from './utils.js';
import mapDef from './mapDef.js';

let options, loadError = false;

// get options, fetching mapDef if necessary
mapDef.init().then(async opts => {
// and if no options, will display empty map with default 4326 view
  options = opts;
// now we have options, fetch modules specified

  // import raster/style modules from registry based on options
  if (options.rasters) {
    await importRasters();
  }

  if (options.vectors) {
    await importVectors();
  }

  // add components
  // don't have to be loaded in sequence.
  // They add themselves to the map, so can simply be imported in a for loop
  if (options.components) {
    options.components.forEach(c => {
      try {
        import('./registry/components/' + c + '.js');
      } catch(err) {
        errors.components(err);
        loadError = true;
      }
    });
  }

  // if (!options.noKeyboardPan) {
  //   // set focus to enable keyboard pan/zoom
  //   olMap.setFocus();
  // }

  // if no map to display, display toolbar
  if (!options.rasters && !options.vectors) {
    await importToolbar();
  }

  if (!loadError && (!options.vectors || (options.center || options.zoom))) {
    // hide status div if not waiting for zoom to data extent
    $('#status').style.display = 'none';
  }
})
.catch(err => errors.noMapDef(err));

async function importRasters() {
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
  try {
    const importeds = await Promise.all(imports);
    // now we have the raster modules, add layers/sources
    if (importeds) {
      // rasters module is 1st in array
      const rasters = importeds.shift();
      rasters.default.addInitial(importeds, options);
    }
  } catch(err) {
    errors.rasters(err);
    loadError = true;
  }
}

async function importVectors() {
  // add vector layers/sources
  try {
    const vectors = await import('./vectors.js');
    vectors.default.addInitial(options);
  } catch (err) {
    errors.vectors(err);
    loadError = true;
  }
}

async function importToolbar() {
  try {
    const toolbar = await import('./registry/components/toolbar.js');
    $('#slide-toggle').dispatchEvent(new MouseEvent('click'));
  } catch(err) {
    errors.components(err);
    loadError = true;
  }
}
