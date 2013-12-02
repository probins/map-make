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
 * -- noZoomToExtent: true (to override zoom to vector data extent)
 * -- rotation
 * -- if no rasters, projCode can be set, else 4326 used
 */

// controller script
// uses jspm global

  // literal vars
  var exampleDir = './examples/',
      registry = './registry/',
      sourceDir = registry + 'sources/',
      styleDir = registry + 'styles/';
  // jspm module name map
  var config = {
    ol: './olMod',
    proj: './projMod'
  };
  jspm.config({
    map: config
  });
  
  // FIXME ugly hack so ol.HAVE_PROJ4JS is always true
  window.Proj4js = {};

  var mapDef, i, qsOptions = {};
  // querystring has priority
  if (window.location.search) {
    var qs = window.location.search.substring(1).split('&');
    for (i = 0; i < qs.length; i++) {
      var pair = qs[i].split('=');
      // mapDef param
      if (pair[0] == 'mapDef') {
        mapDef = pair[1];
        break;
      }
      if (pair[0] == 'rasters') {
        qsOptions.rasters = pair[1].split(',');
      }
      if (pair[0] == 'lat') {
        qsOptions.lat = pair[1];
      }
      if (pair[0] == 'lon') {
        qsOptions.lon = pair[1];
      }
      if (pair[0] == 'zoom') {
        qsOptions.zoom = pair[1];
      }
    }
    if (qsOptions.lat && qsOptions.lon) {
      qsOptions.center = {
        lat: qsOptions.lat,
        lon: qsOptions.lon
      };
    }
  } else {
    // otherwise get mapDef from mapDef div
    var md = document.getElementById('mapDef');
    if (md) {
      mapDef = md.innerHTML;
    }
  }

  // import olMap
  var imports = ['./olMap'];
  // ... and optionally mapDef
  if (mapDef) {
    imports.push(exampleDir + mapDef + '.json!');
  }
  jspm.import(imports, function(olMap) {
    var options = arguments[1] || qsOptions || {
      projCode: 'EPSG:4326'
    };

    // import raster/style modules from registry based on config
    var imports = [], styles = [];
    if (options.rasters) {
      for (i = 0; i < options.rasters.length; i++) {
        var modName = options.rasters[i];
        config[modName] = sourceDir + modName;
        imports.push(modName);
      }
    }
    if (options.vectors) {
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
      var i, div;
      // create layer switcher div
      var layersDiv = document.createElement('div');
      layersDiv.id = 'layerswitch';

      // create map
      olMap.createMap(options.target, options.noKeyboardPan);

      if (options.rasters) {
        // create raster sources and views
        var rasters = {};
        for (i = 0; i < options.rasters.length; i++) {
          rasters[options.rasters[i]] = arguments[i];
        }
        div = olMap.createRasters(rasters, options); // returns layers div
        addLayersDiv(div, layersDiv, 'Rasters'); // FIXME English
        if (!options.vectors) {
          olMap.make1stLayerVisible();
        }
      } else {
        // no raster sources, so 4326 view
        olMap.create4326View();
      }

      if (options.vectors) {
        // create vector sources
        var styleDefs = {};
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

        div = olMap.createVectors(options.vectors); // returns layers div
        addLayersDiv(div, layersDiv, 'Vectors'); // FIXME English

        // by default, maps with vectors zoom to data extent, unless
        // noZoomToExtent set
        options.zoomToExtent = options.noZoomToExtent ? false : true;
        if (options.zoomToExtent) {
          // if zoomToExtent, delay display of layers until vector data loaded
          olMap.addFeaturesListener();
        } else {
          if (options.rasters) {
            olMap.make1stLayerVisible();
          }
        }
        if (!options.rasters) {
          olMap.setDefaultView('EPSG:4326');
        }
      }

      // add controls/widgets
      if (options.widgets) {
        olMap.addWidgets(options.widgets);
      }

      if (!options.zoomToExtent) {
        var status = document.getElementById('status');
        if (status) {
          status.style.display = 'none';
        }
      }
      if (!options.noKeyboardPan) {
        olMap.get().getTarget().focus();
      }

      // layerswitcher
      document.body.appendChild(layersDiv);

      
      function addLayersDiv(div, layersDiv, name) {
        var label = document.createElement('div');
        label.innerHTML = name;
        layersDiv.appendChild(label);
        layersDiv.appendChild(div);
      }
    });
  }, function() {alert('mapDef does not exist')}); // catch import error FIXME English
