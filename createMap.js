// fix so proj can handle 3857
Proj4js.defs['EPSG:3857'] = Proj4js.defs['EPSG:3785'];
// wait for scripts to load
window.onload = function() {
/** initialise namespace/global var (CM stands for 'create map' :-))
 * other scripts update this var when they are loaded.
 * Currently, there are 2 properties: options and rasters.
 * Rasters are defined from registry scripts, one for each source/layer.
 * - each raster defines the projection/resolutions/extent for that source
 * - a different view is created for each projection
 * - only 1 raster can currently be displayed at one time
 * Options are set in the html page.
 * valid options are:
 * - map options:
 * -- target (creates one if not present)
 * -- controls: currently scaleline, latlonmouse (mousePosition in latlons),
 *    projectedmouse (mousePosition in projected coords)
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
  CM = CM || {};
  CM.rasters = CM.rasters || {};

  var options = CM.options || {
    projCode: 'EPSG:4326'
  };
  var rasterLayers = [], vectorLayers = [], views = {};
  var defaultView, projCode;

// main process

  // create raster sources and views
  if (options.rasters) {
    var r = createRasters(options.rasters); // returns layers and object with proj defs
    rasterLayers = r[0];
    for (projCode in r[1]) {
      // 1 view per projection
      if (projCode != 'dfault') {
        views[projCode] = createView(options, projCode, r[1][projCode].extent, r[1][projCode].resolutions);
      }
    }
    defaultView = r[1].dfault;
  } else {
    // vectors only, so use 4326 view
    projCode = 'EPSG:4326';
    views[projCode] = createView({projCode: projCode}, options);
    defaultView = projCode;
  }

  // create vector sources
  if (options.vectors) {
    vectorLayers = createVectors(options.vectors);
    // by default, maps with vectors zoom to data extent, unless
    // noZoomToExtent set
    options.zoomToExtent = options.noZoomToExtent ? false : true;
  }

  if (options.zoomToExtent) {
    addFeatureListener(vectorLayers, rasterLayers[0]);
  } else {
    if (rasterLayers[0]) {
      rasterLayers[0].setVisible(true);
    }
  }
  
  var mapOptions = {
    renderer: ol.RendererHint.CANVAS, // currently only canvas handles vectors
    layers: rasterLayers.concat(vectorLayers),
    view: views[defaultView]
  };

  // create default target div with 400px height and tabindex if not defined in options 
  mapOptions.target = options.target || createMapTarget(options.noKeyboardPan);

  // add controls
  if (options.controls) {
    mapOptions.controls = ol.control.defaults().extend(createControls(options.controls));
  }

  // stick map var in global so can be used in console
  CM.map = new ol.Map(mapOptions);
  if (!options.zoomToExtent) {
    document.getElementById('status').style.display = 'none';
  }
  if (!options.noKeyboardPan) {
  	CM.map.getTarget().focus();
  }


/** functions
 */
  function createRasters(rasters) {
    // uses CM global
    var slect = createLayerswitch(rasters);
    var rasterLayers = [];
    var projs = {};
    for (var i = 0; i < rasters.length; i++) {
      // this assumes correct raster defined
      var raster = CM.rasters[rasters[i]];
      var projCode = raster.projCode || 'EPSG:3857';
      if (!projs[projCode]) {
        projs[projCode] = {
          extent: raster.extent,
          resolutions: raster.resolutions
        };
        // 1st one is default
        if (!projs.dfault) {
          projs.dfault = projCode;
        }
      }
      // set layers invisible to start with
      raster.layer.setVisible(false);
      rasterLayers.push(raster.layer);
      var option = document.createElement('option');
      option.value = option.textContent = raster.layer.get('id');
      option.selected = (i === 0) ? true : false;
      slect.appendChild(option);
    }
    return [rasterLayers, projs];
  }

  function createVectors(vectors) {
    var vectorLayers = [];
    for (var i = 0, s = vectors; i < s.length; i++) {
      var vectOpts = {
        source: new ol.source.Vector({
          url: s[i].url,
          attributions: [new ol.Attribution({
            html: s[i].attribution
          })],
          parser: new ol.parser[s[i].parser]()
        }),
        layerType: 'vector' // so can distinguish vector layers
      };
      if (s[i].stroke) {
        // change default style
        vectOpts.style = new ol.style.Style({
          symbolizers: [
            new ol.style.Stroke({
              color: s[i].stroke.color,
              width: s[i].stroke.width,
              opacity: s[i].stroke.opacity
            })
          ]
        });
      }
      vectorLayers.push(new ol.layer.Vector(vectOpts));
    }
    return vectorLayers;
  }
  
  /**
   * Add event returns extent, so can use this to zoom to feature data extent.
   * Make first tile layer visible at this point, so tiles are only fetched after the
   * extent has been established and the appropriate zoom/resolution set.
   */
  function addFeatureListener(vectorLayers, rasterLayer0) {
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    // callback
    var featureAdd = function(e) {
      // FIXME hack until https://github.com/openlayers/ol3/issues/1134 fixed
      ol.extent.extend(vectorsExtent, e.extents ? e.extents[0] : e.a[0]);
      sourcesRead++;
      if (sourcesRead == vectorLayers.length) {
        CM.map.getView().fitExtent(vectorsExtent, CM.map.getSize());
        // CM.map.getLayers().getArray().filter(function(l){return l.lt=='vector'})
        if (rasterLayer0) {
          rasterLayer0.setVisible(true);
        }
        document.getElementById('status').style.display = 'none';
      }
    };
    for (var i = 0; i < vectorLayers.length; i++) {
      vectorLayers[i].on('featureadd', featureAdd);
    }
  }
  
  function createView(options, projCode, extent, resolutions) {
  // uses center, zoom and rotation options
  // and extent, projCode and resolutions from layer def
  // default center is center of raster extents; default zoom 0
  	var defaultCenter = extent ? ol.extent.getCenter(extent)
        : [0, 0];
    var center = options.center ?
        ol.proj.transform([options.center.lon, options.center.lat], 'EPSG:4326', projCode)
        : defaultCenter;
    var viewOptions = {
      center: center,
      zoom: options.zoom || 0
    };
    if (projCode) {
      viewOptions.projection = projCode;
    }
    if (resolutions) {
      viewOptions.resolutions = resolutions;
    }
    if (options.rotation) {
      viewOptions.rotation = options.rotation;
    }
    return new ol.View2D(viewOptions);
  }

  /**
   * param: options.controls (object with each required control set to true)
   * returns: array of ol controls
   * TODO allow setting options for each control
   */
  function createControls(controls) {
    var returns = [];
    var functions = {
      scaleline: function() {
        return new ol.control.ScaleLine();
      },
      latlonmouse: function() {
        // mousePosition in LatLons
        return new ol.control.MousePosition({
          coordinateFormat: function(coordinate) {
            // 4 decimal places for latlons
            return ol.coordinate.toStringHDMS(coordinate) + ' (' +
                ol.coordinate.toStringXY(coordinate, 4) + ')';
          },
          projection: 'EPSG:4326'
        });
      },
      projectedmouse: function() {
        return new ol.control.MousePosition({
          coordinateFormat: function(coordinate) {
            // no decimal places for projected coords
            return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
          },
          // set class to override OL default position/style
          className: 'ol-mouse-position projmouse'
        });
      }
    };
    
    for (var control in controls) {
      returns.push(functions[control]());
    }
    return returns;
  }

  function createLayerswitch(rasters) {
    var slect = document.createElement('select');
    slect.id = 'layerswitch';
    slect.onchange = function(evt) {
      // uses rasterLayers, options, views (as closures)
      var ls = document.getElementById('layerswitch');
      var slected = ls.options[ls.selectedIndex].value;
      var projCode;
      for (var i = 0; i < rasterLayers.length; i++) {
        if (rasters[i] == slected) {
          projCode = rasterLayers[i].getSource().getProjection().getCode();
          rasterLayers[i].setVisible(true);
        } else {
          rasterLayers[i].setVisible(false);
        }
      }
      var from = CM.map.getView().getProjection().getCode();
      if (projCode != from) {
        var extent = CM.map.getView().calculateExtent(CM.map.getSize());
        var view = views[projCode];
        var to = view.getProjection();
        var transformer = ol.proj.getTransform(from, to);
        var newExtent = ol.extent.transform(extent, transformer);
        if (options.vectors) {
          for (i = 0; i < vectorLayers.length; i++) {
            // FIXME not in api
            var features = vectorLayers[i].featureCache_.idLookup_;
            for (var feature in features) {
              features[feature].getGeometry().transform(transformer);
            }
          }
        }
        CM.map.setView(view);
        CM.map.getView().fitExtent(newExtent, CM.map.getSize());
      }
    };
    document.body.appendChild(slect);
    return slect;
  }

  function createMapTarget(noKeyboardPan) {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '400px';
    if (!noKeyboardPan) {
      mapDiv.tabIndex=0; // so can use keyboard pan/zoom
    }
    document.body.appendChild(mapDiv);
    return mapDiv;
  }
};
