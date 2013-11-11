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
 * - global: true (creates a reference to the map object in the CM global)
 * -- target (creates one if not present)
 * -- widgets: currently scaleline, latlonmouse (mousePosition in latlons),
 *    projectedmouse (mousePosition in projected coords); a layerswitcher is
 *    always included
 * -- vectorWidgets: currently tooltip and popup
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
  var defaultView, projCode, label;

/** main process
 */

  // create layer switcher div
  var layersDiv = document.createElement('div');
  layersDiv.id = 'layerswitch';

  // create raster sources and views
  if (options.rasters) {
    var r = createRasters(options.rasters); // returns layers, object with proj defs, and layersDiv
    rasterLayers = r[0];
    for (projCode in r[1]) {
      // 1 view per projection
      if (projCode != 'dfault') {
        views[projCode] = createView(options, projCode, r[1][projCode].extent, r[1][projCode].resolutions);
      }
    }
    defaultView = r[1].dfault;
    label = document.createElement('div');
    label.innerHTML = 'Rasters'; // FIXME English
    layersDiv.appendChild(label);
    layersDiv.appendChild(r[2]);
  } else {
    // vectors only, so use 4326 view
    projCode = 'EPSG:4326';
    views[projCode] = createView({projCode: projCode}, options);
    defaultView = projCode;
  }

  // create vector sources
  if (options.vectors) {
    var v = createVectors(options.vectors);
    vectorLayers = v[0];
    label = document.createElement('div');
    label.innerHTML = 'Vectors'; // FIXME English
    layersDiv.appendChild(label);
    layersDiv.appendChild(v[1]);
    // by default, maps with vectors zoom to data extent, unless
    // noZoomToExtent set
    options.zoomToExtent = options.noZoomToExtent ? false : true;
  }

  if (options.zoomToExtent) {
    // if zoomToExtent, delay display of layers until vector data loaded
    addFeatureListener(vectorLayers);
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

  // add controls/widgets
  if (options.widgets) {
    mapOptions.controls = ol.control.defaults().extend(createControls(options.widgets));
  }

  var map = new ol.Map(mapOptions);
  // stick map var in global so can be used in console
  if (options.global) {
  	CM.map = map;
  }
  
  if (!options.zoomToExtent) {
    document.getElementById('status').style.display = 'none';
  }
  if (!options.noKeyboardPan) {
  	map.getTarget().focus();
  }

  // layerswitcher
  document.body.appendChild(layersDiv);

  // add vector widgets
  if (options.vectorWidgets && options.vectors) {
    createVectorWidgets(options.vectorWidgets);
  }


/** functions
 */
  /**
   * param: options.rasters (array of ids)
   * returns array with layers array, projs array, layersDiv
   */
  function createRasters(rasters) {
    // uses CM global
    var rasterLayers = [];
    var projs = {};
    var rastersDiv = document.createElement('div');
    rastersDiv.id = 'rasters';
    var clickFunc = function(evt) {
      // uses 'map' as closure
      var oldLayer = map.getLayers().getArray().filter(function(l) {
        return l.activeLayer === true;
      })[0]; // only one
      var newLayer = map.getLayers().getArray().filter(function(l) {
        return l.get('id') == evt.target.value;
      })[0]; // only one
      oldLayer.setVisible(false);
      oldLayer.activeLayer = false;
      newLayer.setVisible(true);
      newLayer.activeLayer = true;
      // FIXME getCode not currently exported
      var newProjCode = newLayer.getSource().getProjection().getCode();
      var oldProjCode = oldLayer.getSource().getProjection().getCode();
      if (newProjCode != oldProjCode) {
        var oldExtent = map.getView().calculateExtent(map.getSize());
        var transformer = ol.proj.getTransform(oldProjCode, newProjCode);
        var newExtent = ol.extent.transform(oldExtent, transformer);
        var vectorLayers = map.getLayers().getArray().filter(function(l) {
          return l instanceof ol.layer.Vector;
        });
        for (var i = 0; i < vectorLayers.length; i++) {
          // FIXME not in api
          var features = vectorLayers[i].featureCache_.idLookup_;
          for (var feature in features) {
            features[feature].getGeometry().transform(transformer);
          }
        }
        map.setView(views[newProjCode]);
        map.getView().fitExtent(newExtent, map.getSize());
      }
    };
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
      if (i === 0) {
        raster.layer.activeLayer = true;
      } else {
        raster.layer.activeLayer = false;
      }
      rasterLayers.push(raster.layer);
      // add to layerswitcher
      var inputElem = document.createElement('input');
      inputElem.name = 'rasters';
      inputElem.value = raster.layer.get('id');
      inputElem.type = 'radio';
      if (i === 0) {
        inputElem.checked = true;
      }
      inputElem.onclick = clickFunc;
      rastersDiv.appendChild(inputElem);
      var labelSpan = document.createElement('label');
      labelSpan.innerHTML = inputElem.value;
      labelSpan.style.verticalAlign = 'bottom';
      rastersDiv.appendChild(labelSpan);
      rastersDiv.appendChild(document.createElement("br"));
    }
    return [rasterLayers, projs, rastersDiv];
  }

  /**
   * param: options.vectors (array of ids)
   * returns array of layers array and layersDiv
   */
  function createVectors(vectors) {
    var vectorLayers = [];
    var vectorsDiv = document.createElement('div');
    vectorsDiv.id = 'vectors';
    // function for click handler
    var clickFunc = function(evt) {
      // uses 'map' as closure
      var newLayer = map.getLayers().getArray().filter(function(l) {
        return l.get('id') == evt.target.value;
      })[0]; // only one
      newLayer.setVisible(this.checked);
    };

    for (var i = 0, s = vectors; i < s.length; i++) {
      var vectOpts = {
        source: new ol.source.Vector({
          url: s[i].url,
          attributions: [new ol.Attribution({
            html: s[i].attribution
          })],
          parser: new ol.parser[s[i].parser]()
        }),
        id: s[i].id
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

      // add to layerswitcher
      var inputElem = document.createElement('input');
      inputElem.name = inputElem.value = s[i].id;
      inputElem.type = 'checkbox';
      inputElem.checked = true;
      inputElem.onclick = clickFunc;
      vectorsDiv.appendChild(inputElem);
      var labelSpan = document.createElement('label');
      labelSpan.innerHTML = inputElem.value;
      labelSpan.style.verticalAlign = 'baseline';
      vectorsDiv.appendChild(labelSpan);
      vectorsDiv.appendChild(document.createElement("br"));
    }
    return [vectorLayers, vectorsDiv];
  }
  
  /**
   * Add event returns extent, so can use this to zoom to feature data extent.
   * Make first tile layer visible at this point, so tiles are only fetched after the
   * extent has been established and the appropriate zoom/resolution set.
   * 
   * params: vectorLayers
   */
  function addFeatureListener(vectorLayers) {
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    // callback
    var featureAdd = function(e) {
    	// uses 'map' as closure
      // FIXME hack until https://github.com/openlayers/ol3/issues/1134 fixed
      ol.extent.extend(vectorsExtent, e.extents ? e.extents[0] : e.a[0]);
      sourcesRead++;
      if (sourcesRead == vectorLayers.length) {
        map.getView().fitExtent(vectorsExtent, map.getSize());
        var rasterLayer0 = map.getLayers().getArray().filter(function(l) {
          return l.activeLayer === true;
        })[0]; // only one
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
  
  /**
   * params: options (center, zoom and rotation),
   *        projection code, extent, resolutions array from layer def
   * returns ol.View2D instance
   */
  function createView(options, projCode, extent, resolutions) {
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
   * param: options.widgets (object with each required widget set to true)
   * returns: array of ol controls
   * TODO allow setting options for each widget/control
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
                ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
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
      if (functions[control]) {
        returns.push(functions[control]());
      }
    }
    return returns;
  }

  /**
   * param: options.vectorWidgets (object with each required widget set to true)
   * TODO allow setting options for each widget/control
   */
  function createVectorWidgets(widgets) {
    // uses 'map'
    var functions = {
      popup: function() {
        var popup = document.createElement('div');
        popup.id = 'popup';
        popup.style.backgroundColor = 'white';
        document.body.appendChild(popup);
        var overlay = new ol.Overlay({
          element: document.getElementById('popup'),
          positioning: ol.OverlayPositioning.BOTTOM_CENTER,
          stopEvent: true
        });
        map.addOverlay(overlay);
        // click on feature displays attributes in overlay
        map.on(['click'], function(evt) {
          // uses overlay as closure
          var coordinate = evt.getCoordinate();
          map.getFeatures({
            pixel: evt.getPixel(),
            layers: map.getLayers().getArray().filter(function(l) {
              return l instanceof ol.layer.Vector;
            }),
            success: function(featuresByLayer) {
              var features = [];
              for (var i = 0; i < featuresByLayer.length; i++) {
                features = features.concat(featuresByLayer[i]);
              }
              var html = '';
              // if >1 feature, displays all in one box
              for (i = 0; i < features.length; i++) {
                if (i !== 0) {
                  html += '<br>';
                }
                html += 'Id: '	+ features[i].getId();
                var atts = features[i].getAttributes();
                for (var att in atts) {
                  // FIXME https://github.com/openlayers/ol3/issues/1257
                  if (att !== 'geometry') {
                    html += '<br>' + att + ': ' + atts[att];
                  }
                }
              }
              var el = overlay.getElement();
              el.innerHTML = html;
              el.style.display = 'block';
              overlay.setPosition(coordinate);
            }
          });
        });
      },
      tooltip: function() {
        // uses 'map'
        var tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.zIndex = '20000';
        tooltip.style.backgroundColor = 'white';
        document.body.appendChild(tooltip);
        // assumes only 1 canvas element
        var canvas = document.getElementsByTagName('canvas')[0];
        /**
         * with canvas, vectors have no separate identity, so have to use mousemove
         * with map.getFeatures() to establish whether there is a feature at the
         * new mouse position. If so, make the tooltip div visible with title attribute
         */
        map.on(['mousemove'], function(evt) {
          var pixel = evt.getPixel();
          tooltip.style.top = (pixel[1] + 10) + 'px';
          tooltip.style.left = (pixel[0] + 10) + 'px';
          map.getFeatures({
            pixel: pixel,
            layers: map.getLayers().getArray().filter(function(l) {
              return l instanceof ol.layer.Vector;
            }),
            success: function(featuresByLayer) {
              var features = [];
              for (var i = 0; i < featuresByLayer.length; i++) {
                features = features.concat(featuresByLayer[i]);
              }
              // only handles 1st feature
              // this might be problem if e.g. points on top of polygon:
              // which is required?
              var feature = features[0];
              if (feature) {
                tooltip.innerHTML = feature.get('title') || '';
                tooltip.style.display = 'block';
                // change cursor to indicate to users that they can click on this point
                canvas.style.cursor = 'pointer';
              } else {
                tooltip.style.display = 'none';
                canvas.style.cursor = 'default';
              }
            }
          });
        });
      }
      // these aren't added to map, so nothing to return
    };

    for (var widget in widgets) {
      if (functions[widget]) {
        functions[widget]();
      }
    }
  }

  function createMapTarget(noKeyboardPan) {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '400px'; // make configurable
    if (!noKeyboardPan) {
      mapDiv.tabIndex=0; // so can use keyboard pan/zoom
    }
    document.body.appendChild(mapDiv);
    return mapDiv;
  }
};
