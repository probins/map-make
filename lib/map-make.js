/** Rasters are defined from registry scripts, one for each source/layer.
 * - each raster defines the projection/resolutions/extent for that source
 * - a different view is created for each projection
 * - only 1 raster can currently be displayed at one time
 * Options are set in mapDef, in querystring, or in the html form.
 * valid options are:
 * - map options:
 * -- target (creates one if not present)
 * -- widgets: currently scaleline, latlonmouse (mousePosition in latlons),
 *    projectedmouse (mousePosition in projected coords), tooltip, popup;
 *    a layerswitcher is always included
 * -- noKeyboardPan: true (by default, keyboard pan/zoom are enabled on the
 *    viewport div; use this to override)
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
 * -- initial center {lat: nn, lon: nn} and zoom level
 *    By default maps with vectors zoom to the vector data
 *    and maps with no vectors zoom to the extent of the tile data
 * -- rotation
 * -- if no rasters, projCode can be set, else 4326 used
 */

/** controller module; loaded with and uses System
 * uses System global
 * uses Promise
 * imports olMap, sources/styles/widgets from registry, initialForm/mapDef (as needed)
 * sets paths config for loading proj
 * calls olMap functions to create map
 */

var utils = require('utils');
var mapDef = require('mapDef');

// literal vars
var errors = utils.errors;

System.meta.ol = {
  format: 'global',
  // deps: ['proj4'],
  exports: 'ol'
};
System.meta.proj4 = {
  format: 'global',
  exports: 'proj4'
};
System.paths.proj4 = '//cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js';
System.paths['components/*'] = 'registry/components/*.js';
System.paths['projections/*'] = 'registry/projections/*.js';
System.paths['sources/*'] = 'registry/sources/*.js';
System.paths['styles/*'] = 'registry/styles/*.js';
System.paths['widgets/*'] = 'registry/widgets/*.js';
System.componentCallback = function(e) {
  var scripts = e.target.import.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (script.type == 'module') {
      var source = script.innerHTML.substr(1);
      System.module(source)
      .catch(function(err) { setTimeout(function() { throw err; }); });
    }
  }
};

var i, olMap, styles = [];

// first create status div
createStatus();

// get options, fetching mapDef if necessary
mapDef.init().then(function(options) {
// and if no options, will display empty map with default 4326 view

    System.depCache = {
      'olMap': ['ol']
    };
    // now we have options, fetch modules specified
    // first import olMap which will create empty map
    System.import('olMap').then(function(olMapIn) {
      // System.import('github:jspm/plugin-css').then(function(css) {
      //   System.fetch({address: '../modular-ol3/dist/olCustom.css', metadata: {plugin: css}});
      // }, errors.noMap);
      olMap = olMapIn;

      // import raster/style modules from registry based on options
      var imports = [], modName, key;
      if (options.rasters) {
        // assemble array of raster modules to import
        for (i = 0; i < options.rasters.length; i++) {
          // raster option can be object with apikey
          if (typeof options.rasters[i] === 'object') {
            for (key in options.rasters[i]) {
              modName = key; // only 1
            }
          // ... or string
          } else {
            modName = options.rasters[i];
          }
          imports.push('sources/' + modName);
        }
        // fetch raster modules
        return Promise.all(
          // map import array to an array of import promises
          imports.map(System.import.bind(System))
        );
      }
    }, errors.noMap).then(function(importeds) {
      // now we have the raster modules, add layers/sources
      var defaultView;
      if (options.rasters) {
        olMap.addRasters(importeds, options);
        defaultView = importeds[0].projCode || 'EPSG:3857';
      } else {
        // no raster sources, so 4326 view
        olMap.create4326View();
        defaultView = 'EPSG:4326';
      }

      olMap.setDefaultView(defaultView);

      if (options.vectors) {
        var imports = [];
        // assemble array of style json files to import
        for (i = 0; i < options.vectors.length; i++) {
          if (options.vectors[i].styles) {
            for (var j = 0; j < options.vectors[i].styles.length; j++) {
              var style = options.vectors[i].styles[j];
              styles.push(style);
              imports.push({address: 'styles/' + style + '.json', metadata: {}});
            }
          }
        }

        if (imports.length > 0) {
          // fetch style modules
          return Promise.all(
            // map import array to an array of fetch promises
            imports.map(System.fetch)
          );
        }
      } else {
        // if no vectors, make 1st raster visible
        olMap.makeActiveLayerVisible();
      }
    }, errors.rasters).then(function(importeds) {
      if (options.vectors) {
        if (importeds) {
          // now we have style modules
          // loop through style options, setting vector option styles using def from imported json
          var styleDefs = {};
          for (i = 0; i < importeds.length; i++) {
            styleDefs[styles[i]] = JSON.parse(importeds[i]);
          }
          for (i = 0; i < options.vectors.length; i++) {
            if (options.vectors[i].styles) {
              for (var j = 0; j < options.vectors[i].styles.length; j++) {
                options.vectors[i].styles[j] = styleDefs[options.vectors[i].styles[j]];
              }
            }
          }
        }

        // add vector layers/sources
        olMap.addVectors(options);

        // by default, maps with vectors zoom to data extent, unless
        // center/zoom set
        if (options.center || options.zoom) {
          if (options.rasters) {
            olMap.makeActiveLayerVisible();
          }
        } else {
          // if no center/zoom, delay display of layers until vector data loaded
          olMap.addFeaturesListener();
        }
        if (!options.rasters) {
          // if no rasters, 4326 view
          olMap.setDefaultView('EPSG:4326');
        }
      }
    }, errors.vectors).then(function() {
      // add controls/widgets
      // these are also in modules but don't have to be loaded in sequence
      // so can simply be imported in a for loop
      if (options.widgets) {
        for (var widget in options.widgets) {
          System.import('widgets/' + widget);//.catch(errorHandler);
        }
      }
      if (options.components) {
        for (var component in options.components) {
          utils.importComponent(component);
        }
      }

      if (!options.vectors || (options.center || options.zoom)) {
        // remove status div if not waiting for zoom to data extent
        var status = document.getElementById('status');
        if (status) {
          status.style.display = 'none';
        }
      }
      if (!options.noKeyboardPan) {
        // set focus to enable keyboard pan/zoom
        olMap.setFocus();
      }

      // if mouseposition not in options, add to toolbar
      if (!(options.widgets && options.widgets.mouseposition)) {
        var mouseButton = document.createElement('button');
        mouseButton.id = 'mouseButton';
        mouseButton.innerHTML = 'Mouse position'; // FIXME English
        mouseButton.addEventListener('click', function() {
          System.import('widgets/mouseposition');
          this.style.display = 'none';
        });
        document.getElementById('widgets').appendChild(mouseButton);
      }
    }, errors.widgets);
});


function createStatus() {
  var statusDiv = document.createElement('div');
  statusDiv.id = 'status';
  statusDiv.style.textAlign = 'center';
  statusDiv.innerHTML = 'Building map, please wait ...'; // FIXME English
  document.body.appendChild(statusDiv);
}
