/** Rasters are defined from registry scripts, one for each source/layer.
 * - each raster defines the projection/resolutions/extent for that source
 * - a different view is created for each projection
 * - only 1 raster can currently be displayed at one time
 * Options are set in the html page.
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
 * --- parser (should be the name of the ol class: GeoJSON, KML, GPX ...)
 * --- attribution
 * --- optionally, style can be given to override ol defaults
 * - view options:
 * -- initial center {lat: nn, lon: nn} and zoom level
 *    By default maps with vectors zoom to the vector data
 *    and maps with no vectors zoom to the extent of the tile data
 * -- rotation
 * -- if no rasters, projCode can be set, else 4326 used
 */

// controller script; not actually a module, but loaded with jspm to use baseURL
// uses jspm global

// literal vars
var registry = '~/registry/',
    sourceDir = registry + 'sources/',
    styleDir = registry + 'styles/',
    htmlDir = '~/html/',
    errors = {
      // FIXME English
      noRaster: 'Raster or style does not exist',
      noMapdef: 'mapDef does not exist'
    };
// jspm module name map
var config = {
  olMap: '~/olMap',
  projWrapper: '~/plugins/projWrapper',
  proj: 'cdnjs:proj4js/1.1.0/proj4js-compressed.js!projWrapper'
};
jspm.config({
  map: config
});

// ugly hack so ol.HAVE_PROJ4JS is always true
// using global var, as trying to modify module is PITA
window.Proj4js = {};

// options can be defined in a mapDef div or in querystring
var mapDef, i, qsOptions, md;
// querystring has priority
if (window.location.search) {
  qsOptions = parseQueryString();
  // mapDef can be defined in qs
  if (qsOptions.mapDef) {
    mapDef = qsOptions.mapDef;
  }
} else {
  // otherwise get mapDef from mapDef div
  md = document.getElementById('mapDef');
  if (md) {
    mapDef = md.innerHTML;
  }
}
// and if that doesn't exist either, display initial form
if (!mapDef && !qsOptions) {
  jspm.import(htmlDir + 'initialForm.html!text', displayForm);
} else {
  // now we have options, create map
  // import olMap
  var imports = ['olMap'];
  // ... and optionally mapDef
  if (mapDef) {
    imports.push(mapDef + '!json'); // mapDef always json
  }
  jspm.import(imports, function(olMap) {
    // set options to either mapDef, qs or default
    var options = arguments[1] || qsOptions || {
      projCode: 'EPSG:4326'
    };

    // import raster/style modules from registry based on config
    var imports = [], styles = [], modName, key;
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
        config[modName] = sourceDir + modName;
        imports.push(modName);
      }
    }
    if (options.vectors) {
      // assemble array of style json files to import
      for (i = 0; i < options.vectors.length; i++) {
        if (options.vectors[i].styles) {
          for (var j = 0; j < options.vectors[i].styles.length; j++) {
            var style = options.vectors[i].styles[j];
            styles.push(style);
            imports.push(styleDir + style + '.json!json');
          }
        }
      }
    }
    // set loader module names
    jspm.config({
      map: config
    });
    // fetch raster/style modules
    jspm.import(imports, function() {
      var i;

      // create empty map
      olMap.createMap(options.target, options.noKeyboardPan);

      if (options.rasters) {
        var rasters = {}, rasterDef, key;
        // loop through raster options, using def from imported module
        for (i = 0; i < options.rasters.length; i++) {
          if (typeof options.rasters[i] === 'object') {
            for (key in options.rasters[i]) {
              rasterDef = key; // only 1
            }
          } else {
            rasterDef = options.rasters[i];
          }
          rasters[rasterDef] = arguments[i];
        }
        
        // create raster sources and views
        olMap.createRasters(rasters, options);
        
      } else {
        // no raster sources, so 4326 view
        olMap.create4326View();
      }

      if (options.vectors) {
        var styleDefs = {};
        // loop through style options, using def from imported json
        if (styles) {
          for (i = options.rasters.length; i < arguments.length; i++) {
            styleDefs[styles[i-options.rasters.length]] = arguments[i];
          }
        }
        for (i = 0; i < options.vectors.length; i++) {
          if (options.vectors[i].styles) {
            options.vectors[i].styles[0] = styleDefs[options.vectors[i].styles[0]]; //FIXME >1
          }
        }

        // create vector sources
        olMap.createVectors(options.vectors);

        // by default, maps with vectors zoom to data extent, unless
        // center/zoom set
        if (options.center || options.zoom) {
          if (options.rasters) {
            olMap.make1stLayerVisible();
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

      // add controls/widgets
      if (options.widgets) {
        olMap.addWidgets(options.widgets);
      }

      if (options.center || options.zoom) {
        // remove status div if not waiting for zoom to data extent
        var status = document.getElementById('status');
        if (status) {
          status.style.display = 'none';
        }
      }
      if (!options.noKeyboardPan) {
        olMap.setFocus();
      }

      // layerswitcher
      document.body.appendChild(olMap.getLayersDiv());

    }, function() {alert(errors.noRaster)}); // catch import error
  }, function() {alert(errors.noMapdef)}); // catch import error
}

  function parseQueryString() {
    var qsOptions = {}, pair, widgets, i, j;
    var qs = window.location.search.substring(1).split('&');
    for (i = 0; i < qs.length; i++) {
      pair = qs[i].split('=');
      switch (pair[0]) {
        // mapDef param
        case 'mapDef':
          return {mapDef: pair[1]};
        case 'rasters':
          // rasters can be comma-separated list
          qsOptions.rasters = pair[1].split(',');
          break;
        case 'lat':
          qsOptions.lat = parseFloat(pair[1]);
          break;
        case 'lon':
          qsOptions.lon = parseFloat(pair[1]);
          break;
        case 'zoom':
          qsOptions.zoom = parseFloat(pair[1]);
          break;
        case 'widgets':
          qsOptions.widgets = {};
          widgets = pair[1].split(',');
          for (j = 0; j < widgets.length; j++) {
            qsOptions.widgets[widgets[j]] = true;
          }
          break;
      }
    }
    if (qsOptions.lat && qsOptions.lon) {
      qsOptions.center = {
        lat: qsOptions.lat,
        lon: qsOptions.lon
      };
    }
    return qsOptions;
  }

  function displayForm(html) {
    var status = document.getElementById('status');
    status.style.top = '5%';
    status.style.left = '5%';
    status.innerHTML = html;
    document.getElementById('mapDef').addEventListener('change', function() {
      window.location.search = 'mapDef=' + this.value;
    });
    document.getElementById('mapDefForm').addEventListener('click', processForm);
  }
      
  function processForm() {
    var qs = 'rasters=' + document.options.rasters.value; // should always be present
    if (document.options.lat.value !== '') {
      qs += '&lat=' + document.options.lat.value;
    }
    if (document.options.lon.value !== '') {
      qs += '&lon=' + document.options.lon.value;
    }
    if (document.options.zoom.value !== '') {
      qs += '&zoom=' + document.options.zoom.value;
    }
    var op = [], widgets = document.options.widgets;
    for (i=0; i < widgets.length; i++){
      if (widgets[i].checked === true){
        op.push(widgets[i].value);
      }
    }
    if (op.length > 0) {
      qs += '&widgets=' + op.join();
    }
    // set querystring so will be resubmitted and can be picked up by logic above
    window.location.search = qs;
  }
