System.config({
  depCache: {
  'olMap': ['ol']
}});
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
  set(qsOptions || {
    projCode: 'EPSG:4326'
  });
}
// if mapDefUrl, will be fetched by init()


function parseQueryString() {
  var qsOptions = {}, pair, widgets, components, vectors;
  var qs = window.location.search.substring(1).split('&');
  qs.forEach(function(part) {
    pair = part.split('=');
    switch (pair[0]) {
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
      case 'components':
        qsOptions.components = {};
        components = pair[1].split(',');
        components.forEach(function(w) {
          qsOptions.components[w] = true;
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
        // will catch mapDef
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


function set(def) {
  mapDef = def;
}

module.exports = {
  // initialise mapDef, fetching url if needed
  init: function() {
    return new Promise(function (resolve, reject) {
      if (mapDefUrl) {
        // must be CORS-enabled
        fetch(decodeURIComponent(mapDefUrl)).then(function(response) {
          return response.json();
        }).then(function(opts) {
          set(opts);
          resolve(opts);
        }).catch(function() {
          reject();
        });
      } else {
        resolve(mapDef);
      }
    });
  },

  get: function() {
    return mapDef;
  },

  set: set
};
