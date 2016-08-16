'use strict';

System.register(['./utils.js', './mapDef.js'], function (_export, _context) {
  var utils, mapDef, $, errors, options;
  return {
    setters: [function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_mapDefJs) {
      mapDef = _mapDefJs.default;
    }],
    execute: function () {
      $ = utils.$;
      errors = utils.errors;


      // get options, fetching mapDef if necessary
      mapDef.init().then(function (opts) {
        // and if no options, will display empty map with default 4326 view
        options = opts;
        // now we have options, fetch modules specified

        // import raster/style modules from registry based on options
        if (options.rasters) {
          var imports = [System.importModule('rasters.js')],
              modName;
          // assemble array of raster modules to import
          options.rasters.forEach(function (r) {
            // raster option can be object with apikey
            if (typeof r === 'object') {
              modName = Object.keys(r)[0]; // only 1
              // ... or string
            } else {
                modName = r;
              }
            imports.push(System.importModule('registry/sources/' + modName + '.js'));
          });
          // fetch raster modules
          return Promise.all(imports);
        }
      }, errors.noMapDef).then(function (importeds) {
        // now we have the raster modules, add layers/sources
        if (importeds) {
          // rasters module is 1st in array
          var rasters = importeds.shift();
          rasters.default.addInitial(importeds, options);
        }
      }, errors.rasters).then(function () {
        if (options.vectors) {
          // add vector layers/sources
          return System.importModule('vectors.js').then(function (vectors) {
            vectors.default.addInitial(options);
          });
        }
      }, errors.vectors).then(function (v) {
        // add components
        // these are also in modules but don't have to be loaded in sequence.
        // They add themselves to the map, so can simply be imported in a for loop
        if (options.components) {
          //   for (var component in options.components) {
          options.components.forEach(function (c) {
            System.importModule('registry/components/' + c + '.js');
          });
        }

        // if (!options.noKeyboardPan) {
        //   // set focus to enable keyboard pan/zoom
        //   olMap.setFocus();
        // }

        // no map to display, so display toolbar
        if (!options.rasters && !options.vectors) {
          System.importModule('registry/components/toolbar.js').then(function () {
            $('#slide-toggle').dispatchEvent(new MouseEvent('click'));
          });
        }
      }, errors.components).then(function () {
        if (!System.error && (!options.vectors || options.center || options.zoom)) {
          // hide status div if not waiting for zoom to data extent
          $('#status').style.display = 'none';
        }
      });
    }
  };
});
