// uses following functions not currently exported:
// source.getProjection(); vectorLayer.featureCache_.idLookup_ (getFeatures);

var ol = require('ol');
require('../../../../ol3/build/ol.css!');

var map;

// create a default div for the map
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

module.exports = {
	createMap: function(target, noKeyboardPan) {
    map = new ol.Map({
      renderer: ol.RendererHint.CANVAS, // currently only canvas handles vectors
      // create default target div with 400px height and tabindex if not defined in options 
      target: target || createMapTarget(noKeyboardPan)
    });
  },

  /**
   * param: options.rasters (array of ids)
   *        rasterDefs (registry defs)
   * returns array with layers array, projs array, layersDiv
   */
  createRasters: function(rasters, rasterDefs) {
    var rasterLayers = [];
    var projs = {};
    // layerswitcher layer list and click handler
    var rastersDiv = document.createElement('div');
    rastersDiv.id = 'rasters';
    var clickHandler = function(evt) {
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
      // FIXME getProjection not currently exported
      var newProjCode = newLayer.getSource().getProjection().getCode();
      var oldProjCode = oldLayer.getSource().getProjection().getCode();
      if (newProjCode != oldProjCode) {
        // new projection, so change view and reproject vectors
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
      // this assumes correct raster definition loaded
      var raster = rasterDefs[rasters[i]];
      var projCode = raster.projCode || 'EPSG:3857';
      if (!projs[projCode]) {
        // assumes all layers for 1 projection have same extent/resolutions
        projs[projCode] = {
          extent: raster.extent,
          resolutions: raster.resolutions
        };
        // 1st one is default
        if (!projs.dfault) {
          projs.dfault = projCode;
        }
      }
      raster.layer = raster.getLayer();
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
      inputElem.onclick = clickHandler;
      rastersDiv.appendChild(inputElem);
      var labelSpan = document.createElement('label');
      labelSpan.innerHTML = inputElem.value;
      labelSpan.style.verticalAlign = 'bottom';
      rastersDiv.appendChild(labelSpan);
      rastersDiv.appendChild(document.createElement("br"));
    }
    return [rasterLayers, projs, rastersDiv];
  },

  /**
   * param: options.vectors (array of ids)
   * returns array of layers array and layersDiv
   */
  createVectors: function(vectors) {
    var vectorLayers = [];
    var vectorsDiv = document.createElement('div');
    vectorsDiv.id = 'vectors';
    // function for click handler
    var clickHandler = function(evt) {
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
      inputElem.onclick = clickHandler;
      vectorsDiv.appendChild(inputElem);
      var labelSpan = document.createElement('label');
      labelSpan.innerHTML = inputElem.value;
      labelSpan.style.verticalAlign = 'baseline';
      vectorsDiv.appendChild(labelSpan);
      vectorsDiv.appendChild(document.createElement("br"));
    }
    return [vectorLayers, vectorsDiv];
  },

  /**
   * params: options (center, zoom and rotation),
   *        projection code, extent, resolutions array from layer def
   * returns ol.View2D instance
   */
  createView: function(options, projCode, extent, resolutions) {
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
  },
  
  /**
   * Add event returns extent, so can use this to zoom to feature data extent.
   * Make first tile layer visible at this point, so tiles are only fetched after the
   * extent has been established and the appropriate zoom/resolution set.
   * 
   * params: vectorLayers
   */
  addFeaturesListener: function (vectorLayers) {
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    // callback
    var featureAdd = function(e) {
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
  },

  /**
   * param: options.widgets (object with each required widget set to true)
   * returns: array of widgets
   * TODO allow setting options for each widget/control
   */
	addWidgets: function(widgets) {
    var functions = {
      scaleline: function() {
        map.addControl(new ol.control.ScaleLine());
      },
      latlonmouse: function() {
        // mousePosition in LatLons
        map.addControl(new ol.control.MousePosition({
            coordinateFormat: function(coordinate) {
              // 4 decimal places for latlons
              return ol.coordinate.toStringHDMS(coordinate) + ' (' +
                  ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
            },
            projection: 'EPSG:4326'
          })
        );
      },
      projectedmouse: function() {
        var style = document.createElement('style');
        // FIXME: make configurable
        style.appendChild(document.createTextNode('.projmouse {top: 28px}'));
        document.head.appendChild(style);
        map.addControl(new ol.control.MousePosition({
            coordinateFormat: function(coordinate) {
              // no decimal places for projected coords
              return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
            },
            // set class to override OL default position/style
            className: 'ol-mouse-position projmouse'
          })
        );
      },
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
        // click on feature displays attributes in overlay
        map.on(['click'], function(evt) {
          // uses overlay as closure
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
              overlay.setPosition(evt.getCoordinate());
            }
          });
        });
        map.addOverlay(overlay);
      },
      tooltip: function() {
        var tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.zIndex = '20000';
        tooltip.style.backgroundColor = 'white';
        document.body.appendChild(tooltip);
        /**
         * with canvas, vectors have no separate identity, so have to use mousemove
         * with map.getFeatures() to establish whether there is a feature at the
         * new mouse position. If so, make the tooltip div visible with title attribute
         */
        map.on(['mousemove'], function(evt) {
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
              // only handles 1st feature
              // this might be problem if e.g. points on top of polygon:
              // which is required?
              var feature = features[0];
              var tooltip = document.getElementById('tooltip');
              // assumes only 1 canvas element
              var canvas = document.getElementsByTagName('canvas')[0];
              if (feature) {
                tooltip.innerHTML = feature.get('title') || '';
                tooltip.style.left = (evt.getPixel()[0] + 10) + 'px';
                tooltip.style.top = (evt.getPixel()[1] + 10) + 'px';
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
    };
    
    for (var widget in widgets) {
      if (functions[widget]) {
        functions[widget]();
      }
    }
  },

	get: function() {
    return map;
	}
};