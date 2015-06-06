var ol = require('ol');
var olMap = require('olMap');
var map = olMap.get();
var switcher = require('components/layerswitcher');
var utils = require('utils');
var rasters = require('rasters');
var status = require('status');

var defaultStyles = {
  normal: {
    stroke: {
      color: 'rgba(0, 0, 255, 0.6)',
      width: 3
    },
    fill: {
      color: 'rgba(255, 255, 255, 0.6)'
    },
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  },
  highlight: {
    stroke: {
      color: 'rgba(255, 0, 0, 0.6)',
      width: 3
    },
    fill: {
      color: 'rgba(255, 0, 0, 0.1)'
    },
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  }
};

function getLayers() {
  return map.getLayers().item(1).getLayers();
}

function switcherHandler(evt) {
  // click may be on label or checkbox
  var target = document.getElementById(evt.target.htmlFor) || evt.target;
  // 'this' is map
  var newLayer = this.getLayers().item(1).getLayers().getArray().filter(function(l) {
    return l.getProperties().id == target.value;
  })[0]; // only one
  newLayer.setVisible(target.checked);
}


/**
 * params: array of vector defs
 * needs ol, getVectorLayers, map, getStyle, switcher, switcherHandler, addWidgetButtons
 */
function add(options) {
  var vectors = options.vectors;
  var formats = {
    geojson: 'GeoJSON',
    gpx: 'GPX',
    kml: 'KML'
  };
  vectors.forEach(function(vector) {
    var format, url = vector.url;
    var sourceOptions = {
      attributions: [new ol.Attribution({
        html: vector.attribution || ''
      })]
    };
    if (vector.type == 'mongodb') {
      sourceOptions.loader = function(extent, resolution, projection) {
        fetch(url).then(function(response) {
          return response.json();
        }).then(function(result) {
          var features = [];
          result.forEach(function(r) {
            var geom = new ol.geom[r.geometry.type](r.geometry.coordinates);
            geom.transform('EPSG:4326', projection);
            r.geometry = geom;
            features.push(new ol.Feature(r));
          });
          var mongoLayers = getLayers().getArray().filter(function(l) {
            return l.getProperties().id==vector.id;
          });
          var source = mongoLayers[0].getSource();
          source.addFeatures(features);
        }).catch(function() {
          utils.errors.fetchFail;
        });
      };
    } else {
      if (url && !vector.format) {
        // define format from file extension
        var ext = url.substring(url.lastIndexOf('.')+1);
        format = formats[ext];
      }
      format = vector.format || format;
      if (url) {
        sourceOptions.url = url;
      }
      if (format) {
        sourceOptions.format = new ol.format[format]();
      }
    }
    var source = new ol.source.Vector(sourceOptions);
    // if this is an added layer, zoom to data extent
    if (vector.add === true) {
      source.once('change', function(e) {
        map.getView().fitExtent(e.target.getExtent(), map.getSize());
      });
    }
    var vectOpts = {
      source: source,
      id: vector.id || url
    };
    // override default style if in options
    var style = vector.styles ? new ol.style.Style({
        fill: new ol.style.Fill(vector.styles[0].fill || getStyle('normal').getFill()),
        stroke: new ol.style.Stroke(vector.styles[0].stroke || getStyle('normal').getStroke()),
        image: new ol.style.Image(vector.styles[0].image || getStyle('normal').getImage()),
      }) : getStyle('normal');
    vectOpts.style = style;
    getLayers().push(new ol.layer.Vector(vectOpts));

    // add to layerswitcher
    var rtns = switcher.addVectorDiv(vector);
    rtns[0].addEventListener('click', switcherHandler.bind(map));
    // if this is 1st vector layer, add vector widget buttons
    if (rtns[1]) {
      addWidgetButtons(options.components);
    }
  });
}

function getStyle(type) {
  return new ol.style.Style({
    stroke: new ol.style.Stroke(defaultStyles[type].stroke),
    fill: new ol.style.Fill(defaultStyles[type].fill),
    image: defaultStyles[type].image
  });
}

function addWidgetButtons(components) {
  components = components || {};
  var button;

  if (!components.popup) {
    button = document.createElement('button');
    button.id = 'popupButton';
    button.innerHTML = 'Popup'; // FIXME English
    button.addEventListener('click', function() {
      System.import('components/featuredisplay');
      this.style.display = 'none';
    });
    document.getElementById('widgets-content').appendChild(button);
  }

  if (!components.tooltip) {
    button = document.createElement('button');
    button.id = 'tooltipButton';
    button.innerHTML = 'Tooltip'; // FIXME English
    button.addEventListener('click', function() {
      System.import('components/tooltip');
      this.style.display = 'none';
    });
    document.getElementById('widgets-content').appendChild(button);
  }
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
  var callback = function(e) {
    ol.extent.extend(vectorsExtent, e.target.getExtent());
    sourcesRead++;
    if (sourcesRead == vectorLayers.length) {
      // we've loaded all the sources
      // so zoom to data extent and make 1st raster layer visible
      map.getView().fitExtent(vectorsExtent, map.getSize());
      rasters.makeActiveLayerVisible();
      status.hide();
    }
  };
  vectorLayers.forEach(function(l) {
    l.getSource().once('change', callback);
  });
}


module.exports = {
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
  getLayers: getLayers,

  getStyle: getStyle
};
