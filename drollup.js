import { rollup } from "https://deno.land/x/drollup@2.38.1+0.7.4/mod.ts";
import { pluginTerserTransform } from "https://deno.land/x/denopack@0.10.0/plugin/terserTransform/mod.ts";
import { importMapPlugin } from './importMapPlugin.js';

const OLVersion = '6.4.3';

const options = {
  plugins: [
    importMapPlugin({
      "importMap": {
        "imports": {
          "ol/": `https://cdn.jsdelivr.net/gh/openlayers/openlayers@${OLVersion}/src/ol/`,
          "/lib/ext/ol.js": "/lib/oldeps.js",
          // "myproj/": "https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/",
          "rbush": "https://jspm.dev/npm:rbush@3.0.1!cjs",
          "rbush/rbush.js": "https://jspm.dev/npm:rbush@3.0.1!cjs"
        }
      }
    }),
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
    sourcemap: true
  }
};

const bundle = await rollup(options);
await bundle.write(options.output);
await bundle.close();
