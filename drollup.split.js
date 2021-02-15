// deno run -A --unstable ./drollup.split.js

import { rollup } from "https://deno.land/x/drollup@2.38.4+0.10.0/mod.ts";
import { pluginTerserTransform } from "https://deno.land/x/denopack@0.10.0/plugin/terserTransform/mod.ts";
import { rollupImportMapPlugin } from "https://deno.land/x/drollup@2.38.4+0.10.0/plugins/importmap/mod.ts";

const OLVersion = '6.5.0';

const options = {
  plugins: [
    rollupImportMapPlugin({
      "maps": {
        "imports": {
          "ol/": `https://cdn.jsdelivr.net/gh/openlayers/openlayers@${OLVersion}/src/ol/`,
          // "/lib/ext/ol.js": "/lib/oldeps.js",
          // "myproj/": "https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/",
          "rbush": "https://jspm.dev/npm:rbush@3.0.1!cjs",
          "rbush/rbush.js": "https://jspm.dev/npm:rbush@3.0.1!cjs"
        }
      }
    }),
    // importMapPlugin({
    //   "importMap": {
    //     "imports": {
    //       "ol/": `https://cdn.jsdelivr.net/gh/openlayers/openlayers@${OLVersion}/src/ol/`,
    //       // "/lib/ext/ol.js": "/lib/oldeps.js",
    //       // "myproj/": "https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/",
    //       "rbush": "https://jspm.dev/npm:rbush@3.0.1!cjs",
    //       "rbush/rbush.js": "https://jspm.dev/npm:rbush@3.0.1!cjs"
    //     }
    //   }
    // }),
    pluginTerserTransform({
      module: true,
      compress: true,
      mangle: true
    })
  ],
  input: {
    "map-make": './lib/map-make.js',
    "registry/components/addlayer": './lib/registry/components/addlayer.js',
    "registry/components/featuredisplay": './lib/registry/components/featuredisplay.js',
    "registry/components/center": './lib/registry/components/center.js',
    "registry/components/cursorposition": './lib/registry/components/cursorposition.js',
    "registry/components/draw": './lib/registry/components/draw.js',
    "registry/components/geolocation": './lib/registry/components/geolocation.js',
    "registry/components/mapdef": './lib/registry/components/mapdef.js',
    "registry/components/placesearch": './lib/registry/components/placesearch.js',
    "registry/components/serialise": './lib/registry/components/serialise.js',
    "registry/components/toolbar": './lib/registry/components/toolbar.js',
    "registry/components/tooltip": './lib/registry/components/tooltip.js',
    "registry/sources/at/topo": './lib/registry/sources/at/topo.js',
    "registry/sources/be/ign/topo": './lib/registry/sources/be/ign/topo.js',
    "registry/sources/bing/AerialLabels": './lib/registry/sources/bing/AerialLabels.js',
    "registry/sources/bing/Road": './lib/registry/sources/bing/Road.js',
    "registry/sources/ch/topo/pixel": './lib/registry/sources/ch/topo/pixel.js',
    "registry/sources/cz/zm": './lib/registry/sources/cz/zm.js',
    "registry/sources/de/bkg/atlasde": './lib/registry/sources/de/bkg/atlasde.js',
    "registry/sources/es/icc/topo": './lib/registry/sources/es/icc/topo.js',
    "registry/sources/es/ign/mapas": './lib/registry/sources/es/ign/mapas.js',
    "registry/sources/fr/ign/etat": './lib/registry/sources/fr/ign/etat.js',
    "registry/sources/fr/ign/photos": './lib/registry/sources/fr/ign/photos.js',
    "registry/sources/fr/ign/topo": './lib/registry/sources/fr/ign/topo.js',
    "registry/sources/gb/os": './lib/registry/sources/gb/os.js',
    "registry/sources/gb/os/leisure": './lib/registry/sources/gb/os/leisure.js',
    "registry/sources/gb/os/light": './lib/registry/sources/gb/os/light.js',
    "registry/sources/gb/os/outdoor": './lib/registry/sources/gb/os/outdoor.js',
    "registry/sources/gb/os/road": './lib/registry/sources/gb/os/road.js',
    "registry/sources/it/pcn": './lib/registry/sources/it/pcn.js',
    "registry/sources/nl/ngr/achter": './lib/registry/sources/nl/ngr/achter.js',
    "registry/sources/osm/osm": './lib/registry/sources/osm/osm.js',
    "registry/sources/osm/opentopo": './lib/registry/sources/osm/opentopo.js',
    "registry/sources/pl/topo": './lib/registry/sources/pl/topo.js',
    "registry/sources/pt/dgt/sc": './lib/registry/sources/pt/dgt/sc.js',
    "registry/sources/si/gurs": './lib/registry/sources/si/gurs.js',
    "registry/sources/srtm/4326": './lib/registry/sources/srtm/4326.js',
    "registry/sources/srtm/laea": './lib/registry/sources/srtm/laea.js',
    "registry/sources/srtm/maps4free": './lib/registry/sources/srtm/maps4free.js'
  },
  external: /^https:\/\/cdn.jsdelivr.net\/gh\/probins\/myproj/,
  output: {
    dir: "dist/",
    format: "esm",
    // sourcemap: true
  }
};

const bundle = await rollup(options);
await bundle.write(options.output);
await bundle.close();
