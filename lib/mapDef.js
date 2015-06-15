System.config({
  depCache: {
    rasters: ['ol', 'olMap', 'components/layerswitcher', 'components/zoom'],
    vectors: ['ol', 'olMap', 'components/layerswitcher', 'rasters'],
    'components/addlayer': ['components/addlayer.html'],
    'components/center': ['components/center.html'],
    'components/draw': ['components/draw.html'],
    'components/featuredisplay': ['components/featuredisplay.html'],
    'components/layerswitcher': ['components/layerswitcher.html', 'components/toolbar'],
    'components/mapdef': ['components/mapdef.html'],
    'components/mouseposition': ['components/mouseposition.html'],
    'components/popup': ['components/popup.html'],
    'components/toolbar': ['components/component', 'components/toolbar.html', 'olMap'],
    'components/tooltip': ['components/tooltip.html'],
    'components/zoom': ['components/component', 'components/zoom.html'],
    'projections/25830': ['proj4'],
    'projections/25831': ['proj4'],
    'projections/27700': ['proj4'],
    'projections/3812': ['proj4'],
    'sources/bTopo': ['projections/3812'],
    'sources/catTopo': ['projections/25831'],
    'sources/eMapas': ['projections/25830'],
    'sources/eMtn': ['projections/25830'],
    'sources/gb': ['projections/27700']
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
  var qsOptions = {}, pair, components, vectors;
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
