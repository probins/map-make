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

/** controller module; loaded with and uses System, and exports httpGet utility function
 * uses System global
 * uses Promise
 * imports olMap, sources/styles/widgets from registry, initialForm/mapDef (as needed)
 * sets paths config for loading proj
 * calls olMap functions to create map
 */

// literal vars
var registry = 'registry/',
    componentDir = 'lib/' + registry + 'components/',
    sourceDir = registry + 'sources/',
    styleDir = 'lib/' + registry + 'styles/',
    widgetDir = registry + 'widgets/',
    htmlDir = 'lib/html/',
    // pluginDir = 'plugins/',
    errors = {
      error: function(err, msg) {
        console.log(err);
        alert(msg);
        return;
      },

      // FIXME English
      fetchFail: function(err) {
        errors.error(err, 'File fetch failed');
        return;
      },
      noForm: function(err) {
        errors.error(err, 'Unable to load form');
        return;
      },
      noMap: function(err) {
        errors.error(err, 'Unable to load olMap/css');
        return;
      },
      noMapDef: function(err) {
        errors.error(err, 'Unable to load mapDef');
        return;
      },
      rasters: function(err) {
        errors.error(err, 'Unable to load raster module(s)');
        return;
      },
      vectors: function(err) {
        errors.error(err, 'Unable to load style module(s)');
        return;
      },
      widgets: function(err) {
        errors.error(err, 'Unable to load widget module(s)');
        return;
      }
    };

System.meta.ol = {
  format: 'global',
  // deps: ['proj4'],
  exports: 'ol'
};
System.meta.proj4 = {
  format: 'global',
  exports: 'proj4'
};
System.paths.proj4 = '//cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.3/proj4.js';
System.paths.layerswitcher = registry + 'components/layerswitcher.js';

// options can be defined in a mapDef div or in querystring
var mapDef, i, qsOptions, md, options, olMap, styles = [];
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
  // when user completes form, page is reloaded with query string, so
  // no need for anything further here
  httpGet(htmlDir + 'initialForm.html')
  .then(displayForm, errors.noForm);

} else {
  // first create status div
  createStatus();

  // if mapDef, fetch it
  getMapDef().then(function(mapDefined) {
    // set options to either mapDef, qs or default
    options = mapDefined || qsOptions || {
      projCode: 'EPSG:4326'
    };

    System.depCache = {
      'olMap': ['ol']
    };
    // now we have options, fetch modules specified
    // first import olMap
    System.import('olMap').then(function(olMapIn) {
      // System.import('github:jspm/plugin-css').then(function(css) {
      //   System.fetch({address: '../modular-ol3/dist/olCustom.css', metadata: {plugin: css}});
      // }, errors.noMap);
      olMap = olMapIn;
      // create empty map
      olMap.createMap(options.target, options.noKeyboardPan);

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
          imports.push(sourceDir + modName);
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
              imports.push({address: styleDir + style + '.json', metadata: {}});
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
        olMap.make1stLayerVisible();
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
    }, errors.vectors).then(function() {
      // add controls/widgets
      // these are also in modules but don't have to be loaded in sequence
      // so can simply be imported in a for loop
      if (options.widgets) {
        for (var widget in options.widgets) {
          System.import(widgetDir + widget);//.catch(errorHandler);
        }
      }
      importComponent('center', componentDir + 'center.html');
      if (options.components) {
        for (var component in options.components) {
          importComponent(component, componentDir + component + '.html');
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
          System.import('registry/widgets/mouseposition');
          this.style.display = 'none';
        });
        document.getElementById('widgets').appendChild(mouseButton);
      }
    }, errors.widgets);
  }, errors.noMapDef);
}

function parseQueryString() {
  var qsOptions = {}, pair, widgets, vectors, i, j;
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
      case 'vectors':
        qsOptions.vectors = [];
        vectors = pair[1].split(',');
        for (j = 0; j < vectors.length; j++) {
          qsOptions.vectors.push(vectors[j] = {
            url: pair[1],
            id: pair[1]
          });
        }
        break;
      default:
        qsOptions[pair[0]] = pair[1];
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
  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  document.getElementById('mapDef').addEventListener('change', function() {
    window.location.search = 'mapDef=' + this.value;
  });
  document.getElementById('mapDefForm').addEventListener('click', processForm);
}
      
function processForm() {
  var qs = 'rasters=' + document.options.rasters.value; // should always be present
  if (document.options.vectors.value !== '') {
    qs += '&vectors=' + document.options.vectors.value;
  }
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

function createStatus() {
  var statusDiv = document.createElement('div');
  statusDiv.id = 'status';
  statusDiv.style.textAlign = 'center';
  statusDiv.innerHTML = 'Building map, please wait ...'; // FIXME English
  document.body.appendChild(statusDiv);
}

function getMapDef() {
  if (mapDef) {
    // must be CORS-enabled
    return httpGet(decodeURIComponent(mapDef));
  } else {
    return Promise.resolve();
  }
}

// Promise-based XHR (from http://www.html5rocks.com/en/tutorials/es6/promises/)
// Replace with fetch()?
function httpGet(url) {
  return new Promise(
    function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status == 200) {
          // success: resolve the promise with the response text
          var response;
          // parse JSON if needed
          if (req.getResponseHeader('content-type').indexOf('application/json') != -1) {
            response = JSON.parse(req.response);
          } else {
            response = req.response;
          }
          resolve(response);
        }
        else {
          // Otherwise reject with the status text
          reject(Error(req.statusText));
        }
      };
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send();
  });
}


module.exports = {
  httpGet: httpGet,
  errors: errors
};
