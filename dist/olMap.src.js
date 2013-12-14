"es6-transpile";
define(
  [],
  function() {
    "use strict";
    var ol = require('ol');
    require('./css/ol.css!');
    var map,
        views = {};
    var layersDiv = document.createElement('div');
    layersDiv.id = 'layerswitch';
    function addLayersDiv(div, layersDiv, name) {
      var label = document.createElement('div');
      label.innerHTML = name;
      layersDiv.appendChild(label);
      layersDiv.appendChild(div);
    }
    function createView(options, projCode, extent, resolutions) {
      var defaultCenter = extent ? ol.extent.getCenter(extent): [0, 0];
      var center = options.center ? ol.proj.transform([options.center.lon, options.center.lat], 'EPSG:4326', projCode): defaultCenter;
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
    function createMapTarget(noKeyboardPan) {
      var mapDiv = document.createElement('div');
      mapDiv.id = 'map';
      mapDiv.style.height = '400px';
      if (!noKeyboardPan) {
        mapDiv.tabIndex = 0;
      }
      document.body.appendChild(mapDiv);
      return mapDiv;
    }
    module.exports = {
      createMap: function(target, noKeyboardPan) {
        map = new ol.Map({
          renderer: ol.RendererHint.CANVAS,
          target: target || createMapTarget(noKeyboardPan)
        });
      },
      createRasters: function(rasterDefs, options) {
        var defaultView;
        var rastersDiv = document.createElement('div');
        rastersDiv.id = 'rasters';
        var switcherClickHandler = function(evt) {
          var target = document.getElementById(evt.target.htmlFor) || evt.target;
          var oldLayers = map.getLayers().getArray().filter(function(l) {
            return l.activeLayer === true;
          });
          var newLayers = map.getLayers().getArray().filter(function(l) {
            return l.get('id') == target.value;
          });
          for (var i = 0; i < oldLayers.length; i++) {
            oldLayers[i].setVisible(false);
            oldLayers[i].activeLayer = false;
          }
          for (i = 0; i < newLayers.length; i++) {
            newLayers[i].setVisible(true);
            newLayers[i].activeLayer = true;
          }
          var newProjCode = newLayers[0].getSource().getProjection().getCode();
          var oldProjCode = oldLayers[0].getSource().getProjection().getCode();
          if (newProjCode != oldProjCode) {
            var oldExtent = map.getView().calculateExtent(map.getSize());
            var transformer = ol.proj.getTransform(oldProjCode, newProjCode);
            var newExtent = ol.extent.transform(oldExtent, transformer);
            var vectorLayers = map.getLayers().getArray().filter(function(l) {
              return l instanceof ol.layer.Vector;
            });
            for (i = 0; i < vectorLayers.length; i++) {
              var features = vectorLayers[i].getFeatures();
              for (var feature in features) {
                features[feature].getGeometry().transform(transformer);
              }
            }
            map.setView(views[newProjCode]);
            map.getView().fitExtent(newExtent, map.getSize());
          }
        };
        for (var i = 0; i < options.rasters.length; i++) {
          var rasterName,
              apikey,
              key;
          if (typeof options.rasters[i] === 'object') {
            for (key in options.rasters[i]) {
              rasterName = key;
              apikey = options.rasters[i][key];
            }
          } else {
            rasterName = options.rasters[i];
          }
          var raster = rasterDefs[rasterName];
          var projCode = raster.projCode || 'EPSG:3857';
          if (!views[projCode]) {
            if (i === 0) {
              defaultView = projCode;
            }
            views[projCode] = createView(options, projCode, raster.extent, raster.resolutions);
          }
          var layers = raster.getLayers({
            zoom: options.zoom,
            apikey: apikey
          }),
              layer;
          for (var j = 0; j < layers.length; j++) {
            layer = layers[j];
            layer.setVisible(false);
            if (i === 0) {
              layer.activeLayer = true;
              if (!options.vectors) {
                layer.setVisible(true);
              }
            } else {
              layer.activeLayer = false;
            }
            map.addLayer(layer);
          }
          var inputElem = document.createElement('input');
          inputElem.name = 'rasters';
          inputElem.value = inputElem.id = layer.get('id');
          inputElem.type = 'radio';
          if (i === 0) {
            inputElem.checked = true;
          }
          var label = document.createElement('label');
          label.htmlFor = label.innerHTML = inputElem.value;
          label.style.verticalAlign = 'bottom';
          var div = document.createElement('div');
          div.appendChild(inputElem);
          div.appendChild(label);
          div.onclick = switcherClickHandler;
          rastersDiv.appendChild(div);
          if (raster.viewEvent) {
            views[projCode].on(raster.viewEvent.type, raster.viewEvent.func);
          }
        }
        map.setView(views[defaultView]);
        addLayersDiv(rastersDiv, layersDiv, 'Rasters');
      },
      create4326View: function(options) {
        var projCode = 'EPSG:4326';
        views[projCode] = createView(options, projCode);
      },
      setDefaultView: function(defaultView) {
        map.setView(views[defaultView]);
      },
      createVectors: function(vectors) {
        var vectorsDiv = document.createElement('div');
        vectorsDiv.id = 'vectors';
        var switcherClickHandler = function(evt) {
          var target = document.getElementById(evt.target.htmlFor) || evt.target;
          var newLayer = map.getLayers().getArray().filter(function(l) {
            return l.get('id') == target.value;
          })[0];
          newLayer.setVisible(target.checked);
        };
        for (var i = 0,
            s = vectors; i < s.length; i++) {
          var parser,
              url = s[i].url;
          if (!s[i].parser) {
            var parsers = {
              geojson: 'GeoJSON',
              gpx: 'GPX',
              kml: 'KML'
            };
            var ext = url.substring(url.lastIndexOf('.') + 1);
            parser = parsers[ext];
          }
          parser = s[i].parser || parser;
          var vectOpts = {
            source: new ol.source.Vector({
              url: url,
              attributions: [new ol.Attribution({html: s[i].attribution})],
              parser: new ol.parser[parser]()
            }),
            id: s[i].id
          };
          if (s[i].styles) {
            if (s[i].styles[0].stroke) {
              var stroke = s[i].styles[0].stroke;
              vectOpts.style = new ol.style.Style({symbolizers: [new ol.style.Stroke({
                  color: stroke.color,
                  width: stroke.width,
                  opacity: stroke.opacity
                })]});
            }
          }
          map.addLayer(new ol.layer.Vector(vectOpts));
          var inputElem = document.createElement('input');
          inputElem.name = inputElem.id = inputElem.value = s[i].id;
          inputElem.type = 'checkbox';
          inputElem.checked = true;
          var label = document.createElement('label');
          label.htmlFor = label.innerHTML = inputElem.value;
          label.style.verticalAlign = 'baseline';
          var div = document.createElement('div');
          div.appendChild(inputElem);
          div.appendChild(label);
          div.onclick = switcherClickHandler;
          vectorsDiv.appendChild(div);
        }
        addLayersDiv(vectorsDiv, layersDiv, 'Vectors');
      },
      createView: createView,
      addFeaturesListener: function() {
        var vectorLayers = map.getLayers().getArray().filter(function(l) {
          return l instanceof ol.layer.Vector;
        });
        var vectorsExtent = ol.extent.createEmpty();
        var sourcesRead = 0;
        var callback = function(e) {
          ol.extent.extend(vectorsExtent, e.extents ? e.extents[0]: e.a[0]);
          sourcesRead++;
          if (sourcesRead == vectorLayers.length) {
            map.getView().fitExtent(vectorsExtent, map.getSize());
            var rasterLayer0 = map.getLayers().getArray().filter(function(l) {
              return l.activeLayer === true;
            })[0];
            if (rasterLayer0) {
              rasterLayer0.setVisible(true);
            }
            var status = document.getElementById('status');
            if (status) {
              status.style.display = 'none';
            }
          }
        };
        for (var i = 0; i < vectorLayers.length; i++) {
          vectorLayers[i].on('featureadd', callback);
        }
      },
      addWidgets: function(widgets) {
        var functions = {
          scaleline: function() {
            map.addControl(new ol.control.ScaleLine());
          },
          latlonmouse: function() {
            map.addControl(new ol.control.MousePosition({
              coordinateFormat: function(coordinate) {
                return ol.coordinate.toStringHDMS(coordinate) + ' (' + ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
              },
              projection: 'EPSG:4326'
            }));
          },
          projectedmouse: function() {
            var style = document.createElement('style');
            style.appendChild(document.createTextNode('.projmouse {top: 28px}'));
            document.head.appendChild(style);
            map.addControl(new ol.control.MousePosition({
              coordinateFormat: function(coordinate) {
                return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
              },
              className: 'ol-mouse-position projmouse'
            }));
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
            map.on(['click'], function(evt) {
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
                  for (i = 0; i < features.length; i++) {
                    if (i !== 0) {
                      html += '<br>';
                    }
                    html += 'Id: ' + features[i].getId();
                    var atts = features[i].getAttributes(true);
                    for (var att in atts) {
                      html += '<br>' + att + ': ' + atts[att];
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
                  var feature = features[0];
                  var tooltip = document.getElementById('tooltip');
                  var canvas = document.getElementsByTagName('canvas')[0];
                  if (feature) {
                    tooltip.innerHTML = feature.get('title') || '';
                    tooltip.style.left = (evt.getPixel()[0] + 10) + 'px';
                    tooltip.style.top = (evt.getPixel()[1] + 10) + 'px';
                    tooltip.style.display = 'block';
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
      make1stLayerVisible: function() {
        map.getLayers().getArray().filter(function(l) {
          return l.activeLayer === true;
        }).forEach(function(e) {
          e.setVisible(true);
        });
      },
      setFocus: function() {
        map.getTarget().focus();
      },
      getLayersDiv: function() {
        return layersDiv;
      },
      get: function() {
        return map;
      }
    };
  });