/**
 * Initial load sets up depCache, and looks for options in mapdef element or
 * querystring.
 *
 * Exports get(mapdef) and set(mapdef), plus init() which fetches mapdef url if needed,
 * and returns Promise which resolves with options
 */

// set up depCache
System.config({
  depCache: {
    'rasters.js': ['ol.js', 'olMap.js', 'registry/components/layerswitcher.js', 'registry/components/zoom.js'],
    'vectors.js': ['ol.js', 'olMap.js', 'registry/components/layerswitcher.js', 'rasters.js', 'mongo.js'],
    'mongo.js': ['ol.js'],
    'registry/components/addlayer.js': ['registry/components/addlayer.html',
        'https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.js'],
    'registry/components/geolocation.js': ['registry/components/geolocation.html', 'registry/components/toolbar.js'],
    'registry/components/layerswitcher.js': ['registry/components/layerswitcher.html', 'registry/components/toolbar.js'],
    'registry/components/toolbar.js': ['registry/components/component.js', 'registry/components/toolbar.html', 'olMap.js'],
    'registry/components/zoom.js': ['registry/components/component.js', 'registry/components/zoom.html'],
    'registry/projections/21781.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/25830.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/25831.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/25832.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/27700.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/28992.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/32633.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/3035.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/3763.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/3812.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/projections/3912.js': ['https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js'],
    'registry/sources/be/ign/topo.js': ['registry/projections/3812.js'],
    'registry/sources/ch/topo/pixel.js': ['registry/projections/21781.js'],
    'registry/sources/cz/zm.js': ['registry/projections/32633.js'],
    'registry/sources/de/bkg/atlasde.js': ['registry/projections/25832.js'],
    'registry/sources/es/icc/topo.js': ['registry/projections/25831.js'],
    'registry/sources/es/ign/mapas.js': ['registry/projections/25830.js'],
    'registry/sources/es/ign/mtn.js': ['registry/projections/25830.js'],
    'registry/sources/gb/os.js': ['registry/projections/27700.js'],
    'registry/sources/nl/ngr/achter.js': ['registry/projections/28992.js'],
    'registry/sources/pt/dgt/sc.js': ['registry/projections/3763.js'],
    'registry/sources/si/gurs.js': ['registry/projections/3912.js'],
    'registry/sources/srtm/laea.js': ['registry/projections/3035.js']
  }
});
var conf = {}, dir = 'registry/components/';
['addlayer', 'center', 'draw', 'featuredisplay', 'mapdef', 'mouseposition',
    'placesearch', 'popup', 'tooltip']
    .forEach(function(c) {
      conf[dir + c + '.js'] = [dir + c + '.html'];
    });
['draw.js', 'featuredisplay.js'].forEach(function(c) {
  conf[dir + c].push('select.js');
  conf[dir + c].push('registry/components/popup.js');
  conf[dir + c].push('measure.js');
});
conf[dir + 'tooltip.js'].push('measure.js');
conf[dir + 'draw.js'].push('registry/components/toolbar.js');
System.config({
  depCache: conf
});

var mapDef;

// options can be defined in a <mapdef> element or in querystring
var options = {}, mapDefUrl;
// mapdef has priority
var mapdefElement = document.querySelector('mapdef');
if (mapdefElement) {
  options = parseElement(mapdefElement);
} else if (window.location.search) {
  options = parseQueryString();
}
if (options.lat && options.lon) {
  options.center = {
    lat: options.lat,
    lon: options.lon
  };
}
// mapDef url
if (options && options.mapDef) {
  mapDefUrl = options.mapDef;
}

// if no options, set default projCode
if (!mapDefUrl) {
  set(options || {
    projCode: 'EPSG:4326'
  });
}
// if mapDefUrl, will be fetched by init()


function parseElement(mapdefElement) {
  var options = {}, children = mapdefElement.children;
  for (var i = 0; i < children.length; i++) {
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
  return options;
}

function parseOption(options, pair) {
  var rasters, vectors;
  switch (pair[0]) {
    case 'rasters':
    case 'r':
      // can be comma-separated list
      options.rasters = [];
      rasters = pair[1].split(',');
      rasters.forEach(function(r) {
        // can be JSON object string: {name:api}
        var p = r.indexOf('{') === -1 ? r : JSON.parse(decodeURIComponent(r));
        options.rasters.push(p);
      });
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
      // can be comma-separated list
      options.components = pair[1].split(',');
      break;
    case 'vectors':
    case 'v':
      // first remove whitespace (replace with space as otherwise strips space from strings)
      pair[1] = pair[1].replace(/\s+/g, ' ');
      // string can be stringified JSON array with JSON object(s),
      // or simple string for 1 file with no extra params
      if (pair[1].indexOf('[') != -1) {
        vectors = JSON.parse(decodeURIComponent(pair[1]));
      } else {
        vectors = [pair[1]];
      }
      options.vectors = [];
      vectors.forEach(function(v) {
        var out;
        // can be JSON object string
        if (typeof v === 'string') {
          out = {
            url: v,
            id: v
          };
        } else {
          // object with url and optionally id/attribution/style/type
          out = {
            url: v.url
          };
          out.id = v.id || v.url;
          if (v.attribution) {
            out.attribution = v.attribution;
          }
          if (v.style) {
            out.style = v.style;
          }
          if (v.format) {
            out.format = v.format;
          }
          if (v.strategy) {
            out.strategy = v.strategy;
          }
        }
        options.vectors.push(out);
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
  // initialise mapDef, fetching url if needed, and returns Promise with options
  init: function() {
    return new Promise(function(resolve, reject) {
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
