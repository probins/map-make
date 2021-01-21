import { importMapPlugin } from './importMapPlugin.js';
import { pluginTerserTransform, RollupOptions, useCache } from "https://deno.land/x/denopack@0.10.0/mod.ts";

const OLVersion = '6.4.3';

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
  input: './lib/oldeps.js',
  output: {
    banner: `/* @preserve OL version ${OLVersion} ${new Date().toISOString()} */`,
    file: "lib/ext/ol.js",
    format: "esm",
    sourcemap: true
  }
};

export default config;
