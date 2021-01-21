import { importMapPlugin } from './importMapPlugin.js';
import { pluginTerserTransform, RollupOptions, useCache } from "https://deno.land/x/denopack@0.10.0/mod.ts";

const config: RollupOptions = {
  plugins: [
    importMapPlugin({
      "importMap": {
        "imports": {
          "ol/": "https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/",
          "/lib/ext/ol.js": "/lib/oldeps.js",
          // "myproj/": "https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/",
          "rbush": "https://jspm.dev/rbush",
          "rbush/rbush.js": "https://jspm.dev/rbush"
        }
      }
    }),
    ...useCache(),
    pluginTerserTransform({
      module: true,
      compress: true,
      mangle: true
    })
  ],
  input: {
    "map-make": './lib/map-make.js',
    addlayer: './lib/registry/components/addlayer.js',
    featuredisplay: './lib/registry/components/featuredisplay.js',
    center: './lib/registry/components/center.js',
    cursorposition: './lib/registry/components/cursorposition.js',
    draw: './lib/registry/components/draw.js',
    geolocation: './lib/registry/components/geolocation.js',
    mapdef: './lib/registry/components/mapdef.js',
    placesearch: './lib/registry/components/placesearch.js',
    serialise: './lib/registry/components/serialise.js',
    tooltip: './lib/registry/components/tooltip.js',
    "sources/at/topo": './lib/registry/sources/at/topo.js',
    "sources/be/ign/topo": './lib/registry/sources/be/ign/topo.js',
    "sources/bing/AerialLabels": './lib/registry/sources/bing/AerialLabels.js',
    "sources/bing/Road": './lib/registry/sources/bing/Road.js',
    "sources/ch/topo/pixel": './lib/registry/sources/ch/topo/pixel.js',
    "sources/cz/zm": './lib/registry/sources/cz/zm.js',
    "sources/de/bkg/atlasde": './lib/registry/sources/de/bkg/atlasde.js',
    "sources/es/icc/topo": './lib/registry/sources/es/icc/topo.js',
    "sources/es/ign/mapas": './lib/registry/sources/es/ign/mapas.js',
    "sources/fr/ign/etat": './lib/registry/sources/fr/ign/etat.js',
    "sources/fr/ign/photos": './lib/registry/sources/fr/ign/photos.js',
    "sources/fr/ign/topo": './lib/registry/sources/fr/ign/topo.js',
    "sources/gb/os": './lib/registry/sources/gb/os.js',
    "sources/gb/os/leisure": './lib/registry/sources/gb/os/leisure.js',
    "sources/gb/os/light": './lib/registry/sources/gb/os/light.js',
    "sources/gb/os/outdoor": './lib/registry/sources/gb/os/outdoor.js',
    "sources/gb/os/road": './lib/registry/sources/gb/os/road.js',
    "sources/it/pcn": './lib/registry/sources/it/pcn.js',
    "sources/nl/ngr/achter": './lib/registry/sources/nl/ngr/achter.js',
    "sources/osm/osm": './lib/registry/sources/osm/osm.js',
    "sources/osm/opentopo": './lib/registry/sources/osm/opentopo.js',
    "sources/pl/topo": './lib/registry/sources/pl/topo.js',
    "sources/pt/dgt/sc": './lib/registry/sources/pt/dgt/sc.js',
    "sources/si/gurs": './lib/registry/sources/si/gurs.js',
    "sources/srtm/4326": './lib/registry/sources/srtm/4326.js',
    "sources/srtm/laea": './lib/registry/sources/srtm/laea.js',
    "sources/srtm/maps4free": './lib/registry/sources/srtm/maps4free.js'
  },
  external: /^https:\/\/cdn.jsdelivr.net\/gh\/probins\/myproj/,
  output: {
    dir: "public/",
    format: "esm",
    // sourcemap: true
  }
};

export default config;
