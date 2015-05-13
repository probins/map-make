var utils = require('utils');
var errors = utils.errors;

var mapDef;

// options can be defined in a mapDef div or in querystring
var qsOptions, mapDefUrl, md;
// querystring has priority
if (window.location.search) {
  qsOptions = parseQueryString();
  // mapDef can be defined in qs
  if (qsOptions.mapDef) {
    mapDefUrl = qsOptions.mapDef;
  }
} else {
  // otherwise get mapDef from mapDef div
  md = document.getElementById('mapDef');
  if (md) {
    mapDefUrl = md.innerHTML;
  }
}

if (!mapDefUrl) {
  setMapDef(qsOptions || {
    projCode: 'EPSG:4326'
  });
}
// if mapDefUrl, will be fetched by initMapDef


function parseQueryString() {
  var qsOptions = {}, pair, widgets, vectors;
  var qs = window.location.search.substring(1).split('&');
  qs.forEach(function(part) {
    pair = part.split('=');
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
        widgets.forEach(function(w) {
          qsOptions.widgets[w] = true;
        });
        break;
      case 'vectors':
        qsOptions.vectors = [];
        vectors = pair[1].split(',');
        vectors.forEach(function(v) {
          qsOptions.vectors.push(v = {
            url: pair[1],
            id: pair[1]
          });
        });
        break;
      default:
        qsOptions[pair[0]] = pair[1];
    }
  });
  if (qsOptions.lat && qsOptions.lon) {
    qsOptions.center = {
      lat: qsOptions.lat,
      lon: qsOptions.lon
    };
  }
  return qsOptions;
}


function setMapDef(def) {
  mapDef = def;
}

module.exports = {
  // initialise mapDef, fetching url if needed
  initMapDef: function() {
    return new Promise(function (resolve, reject) {
      if (mapDefUrl) {
        // must be CORS-enabled
        utils.httpGet(decodeURIComponent(mapDefUrl)).then(function(opts) {
          setMapDef(opts);
          resolve(opts);
        }).catch(errors.noMapDef);
      } else {
        resolve(mapDef);
      }
    });
  },

  getMapDef: function() {
    return mapDef;
  },

  setMapDef: setMapDef
};
