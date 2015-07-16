System.config({
  depCache: {
    rasters: ['ol', 'olMap', 'components/layerswitcher', 'components/zoom'],
    vectors: ['ol', 'olMap', 'components/layerswitcher', 'rasters'],
    'components/layerswitcher': ['components/layerswitcher.html', 'components/toolbar'],
    'components/toolbar': ['components/component', 'components/toolbar.html', 'olMap'],
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
var conf = {}, dir = 'components/';
['addlayer', 'center', 'draw', 'featuredisplay', 'mapdef', 'mouseposition', 'popup', 'tooltip']
    .forEach(function(c) {
  conf[dir + c] = [dir + c + '.html'];
});
['draw', 'featuredisplay'].forEach(function(c) {
  conf[dir + c].push('select');
  conf[dir + c].push('components/popup');
});
System.config({
  depCache: conf
});

var mapDef;

// options can be defined in a <mapdef> element or in querystring
var options, mapDefUrl;
// mapdef has priority
var mapdefElement = document.querySelector('mapdef');
if (mapdefElement) {
  options = parseElement(mapdefElement);
} else if (window.location.search) {
  options = parseQueryString();
}
// mapDef url
if (options.mapDef) {
  mapDefUrl = options.mapDef;
}

if (!mapDefUrl) {
  set(options || {
    projCode: 'EPSG:4326'
  });
}
// if mapDefUrl, will be fetched by init()


function parseElement(mapdefElement) {
  var options = {}, children = mapdefElement.children;
  for (var i = 0; i<children.length; i++) {
    var pair = [children[i].localName, children[i].innerHTML];
    options = parseOption(options, pair);
  }
  return options;
}

function parseQueryString() {
  var options = {}, pair;
  var qs = window.location.search.substring(1).split('&');
  qs.forEach(function(part) {
    pair = part.split('=');
    options = parseOption(options, pair);
  });
  if (options.lat && options.lon) {
    options.center = {
      lat: options.lat,
      lon: options.lon
    };
  }
  return options;
}

function parseOption(options, pair) {
  var vectors;
  switch (pair[0]) {
    case 'rasters':
    case 'r':
      // rasters can be comma-separated list
      options.rasters = pair[1].split(',');
      break;
    case 'lat':
      options.lat = parseFloat(pair[1]);
      break;
    case 'lon':
      options.lon = parseFloat(pair[1]);
      break;
    case 'zoom':
    case 'z':
      options.zoom = parseFloat(pair[1]);
      break;
    case 'components':
    case 'c':
      options.components = pair[1].split(',');
      break;
    case 'vectors':
    case 'v':
      options.vectors = [];
      vectors = pair[1].split(',');
      vectors.forEach(function(v) {
        options.vectors.push(v = {
          url: pair[1],
          id: pair[1]
        });
      });
      break;
    default:
      // will catch mapDef
      options[pair[0]] = pair[1];
  }
  return options;
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
