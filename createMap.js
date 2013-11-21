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

// wait for scripts to load
window.onload = function() {
  // literal vars
	var exampleDir = './examples/',
      sourceDir = './registry/sources/',
      styleDir = './registry/styles/';
  // 'github:probins/createmap/registry/sources/'
  var config = {
    ol: './ol-simple',
    proj: './projMod'
  };
  jspm.config({
    map: config
  });
  
  // FIXME ugly hack so ol.HAVE_PROJ4JS is always true
  window.Proj4js = {};

  var mapDef, i;
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
    }
  } else {
    // otherwise get mapDef from mapDef div
    var md = document.getElementById('mapDef');
    if (md) {
      mapDef = md.innerHTML;
    }
  }

  // import mapDef and olMap
  // FIXME assumes there is a mapDef in examples dir for this name
  jspm.import([exampleDir + mapDef + '.json!json',
      './olMap', 'ol'], function(mapDef, olMap, ol) {
    var options = mapDef || {
      projCode: 'EPSG:4326'
    };

    // import raster/style modules based on config
    var imports = [];
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
            imports.push(styleDir + options.vectors[i].styles[j]);
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
    var views = {};
    var defaultView, projCode, label, i;
  // create layer switcher div
  var layersDiv = document.createElement('div');
  layersDiv.id = 'layerswitch';

  // create map
  olMap.createMap(options.target, options.noKeyboardPan);
  var map = olMap.get();

    if (options.rasters) {
  // create raster sources and views
      var rasters = {};
      for (i = 0; i < options.rasters.length; i++) {
        rasters[options.rasters[i]] = arguments[i];
      }
      var r = olMap.createRasters(options.rasters, rasters); // returns layers, object with proj defs, and layersDiv
      for (projCode in r[1]) {
        // 1 view per projection
        if (projCode != 'dfault') {
          views[projCode] = olMap.createView(options, projCode, r[1][projCode].extent, r[1][projCode].resolutions);
        }
      }
      // if (i == options.rasters.length) {
      // rasterLayers = r[0];
      defaultView = r[1].dfault;
      label = document.createElement('div');
      label.innerHTML = 'Rasters'; // FIXME English
      layersDiv.appendChild(label);
      layersDiv.appendChild(r[2]);
      if (!options.vectors) {
        r[0][0].setVisible(true);
      }
      // add layers to map
      for (i = 0; i < r[0].length; i++) {
        map.addLayer(r[0][i]);
      }
      map.setView(views[defaultView]);
  } else {
    // vectors only, so use 4326 view
    projCode = 'EPSG:4326';
    views[projCode] = olMap.createView({projCode: projCode}, options);
    defaultView = projCode;
  }

  // create vector sources
  if (options.vectors) {
    var v = olMap.createVectors(options.vectors); // returns layers array and div array
    // vectorLayers = v[0];
    label = document.createElement('div');
    label.innerHTML = 'Vectors'; // FIXME English
    layersDiv.appendChild(label);
    layersDiv.appendChild(v[1]);
    // by default, maps with vectors zoom to data extent, unless
    // noZoomToExtent set
    options.zoomToExtent = options.noZoomToExtent ? false : true;
    if (options.zoomToExtent) {
      // if zoomToExtent, delay display of layers until vector data loaded
      olMap.addFeatureListener(v[0]);
    }
    // add layers to map
    for (i = 0; i < v[0].length; i++) {
      map.addLayer(v[0][i]);
    }
    if (!options.rasters) {
      map.setView(views[defaultView]);
    }
  }

  // if (!options.zoomToExtent) {
  //   if (rasterLayers[0]) {
  //     rasterLayers[0].setVisible(true);
  //   }
  // }
  
  // var mapOptions = {
  //   layers: rasterLayers.concat(vectorLayers),
  //   view: views[defaultView]
  // };


  // add controls/widgets
  if (options.widgets) {
    olMap.addWidgets(options.widgets);
  }

  if (!options.zoomToExtent) {
    document.getElementById('status').style.display = 'none';
  }
  if (!options.noKeyboardPan) {
    olMap.get().getTarget().focus();
  }

  // layerswitcher
  document.body.appendChild(layersDiv);
  });
    });
};
