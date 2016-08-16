'use strict';

System.register(['./ol.js', './olMap.js', './registry/components/layerswitcher.js', './utils.js', './rasters.js', './mongo.js'], function (_export, _context) {
  var ol, olMap, switcher, utils, rasters, mongo, map, $, defaultStyles, formats, extensions;

  function getFormat(f) {
    return formats[f];
  }
  function getFormatForExtension(ext) {
    return extensions[ext];
  }

  function getLayers() {
    return map.getLayers().item(1).getLayers();
  }

  function switcherHandler(evt) {
    // click may be on label or checkbox
    var target = document.getElementById(evt.target.htmlFor) || evt.target;
    // 'this' is map
    var newLayer = this.getLayers().item(1).getLayers().getArray().filter(function (l) {
      return l.getProperties().id == target.value;
    })[0]; // only one
    newLayer.setVisible(target.checked);
  }

  /**
   * params: array of vector defs
   * needs ol, getVectorLayers, map, getStyle, switcher, switcherHandler
   */
  function add(options) {
    options.vectors.forEach(function (vector) {
      var format,
          url = vector.url;
      var readOptions = {
        featureProjection: map.getView().getProjection()
      };
      var sourceOptions = {
        attributions: vector.attribution || ''
      };
      var name = url || vector.filename;
      if (name && !vector.format) {
        // define format from file extension
        format = getFormatForExtension(name.substring(name.lastIndexOf('.') + 1));
      }
      format = vector.format || format;
      if (format) {
        sourceOptions.format = getFormat(format);
      }
      if (vector.file) {
        sourceOptions.features = sourceOptions.format.readFeatures(vector.file, readOptions);
      } else if (url) {
        if (vector.strategy && vector.strategy == 'bbox') {
          sourceOptions.strategy = ol.loadingstrategy.bbox;
        }
        sourceOptions.loader = function (extent, resolution, projection) {
          if (vector.strategy && vector.strategy == 'bbox') {
            var wgsExt = ol.proj.transformExtent(extent, projection, 'EPSG:4326');
            url = vector.url + [[wgsExt[0].toFixed(6), wgsExt[1].toFixed(6)], [wgsExt[2].toFixed(6), wgsExt[1].toFixed(6)], [wgsExt[2].toFixed(6), wgsExt[3].toFixed(6)], [wgsExt[0].toFixed(6), wgsExt[3].toFixed(6)], [wgsExt[0].toFixed(6), wgsExt[1].toFixed(6)]].join('],[') + ']]]}}}}';
          }
          fetch(url).then(function (response) {
            if (format == 'GeoJSON' || format == 'mongo') {
              return response.json();
            } else {
              return response.text();
            }
          }).then(function (result) {
            var features = sourceOptions.format.readFeatures(result, readOptions);
            var layers = getLayers().getArray().filter(function (l) {
              return l.getProperties().id == vector.id;
            });
            var source = layers[0].getSource();
            source.addFeatures(features);
          }).catch(function () {
            utils.errors.fetchFail();
          });
        };
      }
      var source = new ol.source.Vector(sourceOptions);
      // if this is an added layer and not bbox, zoom to data extent
      if (vector.add === true && url && !(vector.strategy && vector.strategy == 'bbox')) {
        source.once('change', function (e) {
          map.getView().fit(e.target.getExtent(), map.getSize());
        });
      }
      var vectOpts = {
        source: source,
        id: vector.id || url
      };
      // override default style if in options
      var custom = {},
          att;
      for (att in defaultStyles.normal) {
        custom[att] = defaultStyles.normal[att];
      }
      if (vector.style) {
        for (att in vector.style) {
          custom[att] = vector.style[att];
        }
      }
      defaultStyles[vectOpts.id] = custom;
      vectOpts.style = function (feature) {
        return getStyle(vectOpts.id, feature);
      };
      getLayers().push(new ol.layer.Vector(vectOpts));
      if (vector.add === true && vector.file) {
        map.getView().fit(source.getExtent(), map.getSize());
      }

      // add to layerswitcher
      var rtns = switcher.addVectorDiv(vector);
      rtns[0].addEventListener('click', switcherHandler.bind(map));
      // if this is 1st vector layer, add vector component buttons and not already included
      if (rtns[1]) {
        var comps = options.components || [];
        if (comps.indexOf('popup') == -1) {
          $('#featuredisplayoption').style.display = 'block';
        }
        if (comps.indexOf('tooltip') == -1) {
          $('#tooltipoption').style.display = 'block';
        }
      }
    });
  }

  function getStyle(type, feature) {
    var stroke = {
      width: defaultStyles[type].stroke.width,
      color: defaultStyles[type].stroke.color
    };
    if (Array.isArray(stroke.color)) {
      stroke.color = feature.get(stroke.color[0]) == stroke.color[1] ? stroke.color[2] : stroke.color[3];
    }
    var fC = defaultStyles[type].image.fillColor;
    if (Array.isArray(fC)) {
      fC = feature.get(fC[0]) == fC[1] ? fC[2] : fC[3];
    }
    return new ol.style.Style({
      stroke: new ol.style.Stroke(stroke),
      fill: new ol.style.Fill(defaultStyles[type].fill),
      image: new ol.style.Circle({
        radius: defaultStyles[type].image.radius,
        fill: new ol.style.Fill({ color: fC })
      })
    });
  }

  /**
   * Add event returns extent, so can use this to zoom to feature data extent.
   * Make first tile layer visible at this point, so tiles are only fetched after the
   * extent has been established and the appropriate zoom/resolution set.
   *
   * uses getVectorLayers, map, ol, makeActiveLayerVisible as closures
   */
  function addFeaturesListener() {
    var vectorLayers = getLayers().getArray();
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    // callback
    var callback = function (e) {
      ol.extent.extend(vectorsExtent, e.target.getExtent());
      sourcesRead++;
      if (sourcesRead == vectorLayers.length) {
        // we've loaded all the sources
        // so zoom to data extent and make 1st raster layer visible
        map.getView().fit(vectorsExtent, map.getSize());
        rasters.makeActiveLayerVisible();
        $('#status').style.display = 'none';
      }
    };
    vectorLayers.forEach(function (l) {
      l.getSource().once('change', callback);
    });
  }

  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_registryComponentsLayerswitcherJs) {
      switcher = _registryComponentsLayerswitcherJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_rastersJs) {
      rasters = _rastersJs.default;
    }, function (_mongoJs) {
      mongo = _mongoJs.default;
    }],
    execute: function () {
      map = olMap.get();
      $ = utils.$;
      defaultStyles = {
        normal: {
          stroke: {
            color: 'rgba(0, 0, 255, 0.6)',
            width: 3
          },
          fill: {
            color: 'rgba(255, 255, 255, 0.6)'
          },
          image: {
            radius: 7,
            fillColor: '#ffcc33'
          }
        },
        highlight: {
          stroke: {
            color: 'rgba(255, 0, 0, 0.6)',
            width: 3
          },
          fill: {
            color: 'rgba(255, 0, 0, 0.1)'
          },
          image: {
            radius: 7,
            fillColor: '#ffcc33'
          }
        }
      };
      formats = {};

      ['GeoJSON', 'GPX', 'KML'].forEach(function (f) {
        formats[f] = new ol.format[f]();
      });
      formats['mongo'] = mongo;
      extensions = { geojson: 'GeoJSON', gpx: 'GPX', kml: 'KML' };

      _export('default', {
        addInitial: function (options) {
          add(options);
          // by default, maps with vectors zoom to data extent, unless center/zoom set
          if (options.center || options.zoom) {
            if (options.rasters) {
              rasters.makeActiveLayerVisible();
            }
          } else {
            // if no center/zoom, delay display of layers until vector data loaded
            addFeaturesListener();
          }
          if (!options.rasters) {
            // if no rasters, 4326 view
            olMap.use4326View();
          }
        },

        add: add,

        getFormat: getFormat,
        getLayers: getLayers,
        getStyle: getStyle
      });
    }
  };
});
