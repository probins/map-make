/**
 * Handles vector data/layers, using a default style if this is not defined.
 *
 * Exports:
 * - addInitial() called by map-make.js
 * - add() which uses fetch() to fetch a vector source, and ol code to add to map;
 *   it also handles data from a MongoDB, formatting as appropriate;
 *   also adds to layerswitcher (a simple toggle in the case of vector layers)
 */

import ol from './ext/ol.js';
import olMap from './olMap.js';
var map = olMap.get();
import switcher from './registry/components/layerswitcher.js';
import utils from './utils.js';
import rasters from './rasters.js';
import mongo from './mongo.js';
var $ = utils.$;

var defaultStyles = {
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

var formats = {};
['GeoJSON', 'GPX', 'KML'].forEach(function(f) {
  formats[f] = new ol.format[f]();
});
formats['mongo'] = mongo;
var extensions = {geojson: 'GeoJSON', gpx: 'GPX', kml: 'KML'};
function getFormat(f) {
  return formats[f];
}
function getFormatForExtension(ext) {
  return extensions[ext];
}

function getLayers() {
  return map.getLayers().item(1).get('layers');
}

function switcherHandler(evt) {
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  // 'this' is map
  var newLayer = this.getLayers().item(1).get('layers').getArray().filter(function(l) {
    return l.getProperties().id == target.value;
  })[0]; // only one
  newLayer.set('visible', target.checked);
}


/**
 * params: array of vector defs
 * needs ol, getVectorLayers, map, getStyle, switcher, switcherHandler
 */
function add(options) {
  options.vectors.forEach(function(vector) {
    var format, url = vector.url;
    var readOptions = {
      featureProjection: map.get('view').getProjection()
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
      sourceOptions.features = sourceOptions.format.readFeatures(vector.file,
          readOptions);
    } else if (url) {
      if (vector.strategy && vector.strategy == 'bbox') {
        // copied from ol.loadingstrategy.bbox
        sourceOptions.strategy = function(extent, resolution) {
          return [extent];
        };
      }
      sourceOptions.loader = function(extent, resolution, projection) {
        if (vector.strategy && vector.strategy == 'bbox') {
          var wgsExt = ol.proj.transformExtent(extent, projection, 'EPSG:4326');
          url = vector.url + [[wgsExt[0].toFixed(6), wgsExt[1].toFixed(6)],
              [wgsExt[2].toFixed(6), wgsExt[1].toFixed(6)],
              [wgsExt[2].toFixed(6), wgsExt[3].toFixed(6)],
              [wgsExt[0].toFixed(6), wgsExt[3].toFixed(6)],
              [wgsExt[0].toFixed(6), wgsExt[1].toFixed(6)]]
              .join('],[') + ']]]}}}}';
        }
        fetch(url).then(function(response) {
          if (format == 'GeoJSON' || format == 'mongo') {
            return response.json();
          } else {
            return response.text();
          }
        }).then(function(result) {
          var features = sourceOptions.format.readFeatures(result, readOptions);
          var layers = getLayers().getArray().filter(function(l) {
            return l.getProperties().id == vector.id;
          });
          var source = layers[0].get('source');
          source.addFeatures(features);
        }).catch(function() {
          utils.errors.fetchFail();
        });
      };
    }
    var source = new ol.source.Vector(sourceOptions);
    // if this is an added layer and not bbox, zoom to data extent
    if (vector.add === true && (url && !(vector.strategy && vector.strategy == 'bbox'))) {
      source.once('change', function(e) {
        map.get('view').fit(e.target.getExtent());
      });
    }
    var vectOpts = {
      source: source,
      id: vector.id || url
    };
    // override default style if in options
    var custom = {}, att;
    for (att in defaultStyles.normal) {
      custom[att] = defaultStyles.normal[att];
    }
    if (vector.style) {
      for (att in vector.style) {
        custom[att] = vector.style[att];
      }
    }
    defaultStyles[vectOpts.id] = custom;
    vectOpts.style = function(feature) {
      return getStyle(vectOpts.id, feature);
    };
    getLayers().push(new ol.layer.Vector(vectOpts));
    if (vector.add === true && vector.file) {
      map.get('view').fit(source.getExtent());
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
    color: defaultStyles[type].stroke.color,
    lineDash: defaultStyles[type].stroke.lineDash
  };
  let strokeAttrs = ['color', 'width', 'lineDash'];
  strokeAttrs.forEach(sa => {
    if (Array.isArray(stroke[sa])) {
      // if array, 1st element is feature attribute name
      var attr = feature.get(stroke[sa][0]);
      if (typeof stroke[sa][1] === 'object') {
        // if object, k=attr value, v=color
        stroke[sa] = stroke[sa][1][attr];
      } else {
        // if 0 == 1, 2 else 3
        stroke[sa] = attr == stroke[sa][1] ? stroke[sa][2] : stroke[sa][3];
      }
    }
  });
  var fC = defaultStyles[type].image.fillColor;
  if (Array.isArray(fC)) {
    fC = feature.get(fC[0]) == fC[1] ? fC[2] : fC[3];
  }
  return new ol.style.Style({
    stroke: new ol.style.Stroke(stroke),
    fill: new ol.style.Fill(defaultStyles[type].fill),
    image: new ol.style.Circle({
      radius: defaultStyles[type].image.radius,
      fill: new ol.style.Fill({color: fC})
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
  // copied from ol.extent.createEmpty()
  var vectorsExtent = [Infinity, Infinity, -Infinity, -Infinity];
  var sourcesRead = 0;
  // callback
  var callback = function(e) {
    // copied from ol.extent.extend
    var extend = function(extent1, extent2) {
      if (extent2[0] < extent1[0]) {
        extent1[0] = extent2[0];
      }
      if (extent2[2] > extent1[2]) {
        extent1[2] = extent2[2];
      }
      if (extent2[1] < extent1[1]) {
        extent1[1] = extent2[1];
      }
      if (extent2[3] > extent1[3]) {
        extent1[3] = extent2[3];
      }
      return extent1;
    };
    extend(vectorsExtent, e.target.getExtent());
    sourcesRead++;
    if (sourcesRead == vectorLayers.length) {
      // we've loaded all the sources
      // so zoom to data extent and make 1st raster layer visible
      map.get('view').fit(vectorsExtent);
      rasters.makeActiveLayerVisible();
      $('#status').style.display = 'none';
    }
  };
  vectorLayers.forEach(function(l) {
    l.get('source').once('change', callback);
  });
}


export default {
  addInitial: function(options) {
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
};
