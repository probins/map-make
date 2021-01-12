import { pluginImportResolver } from "https://deno.land/x/denopack@0.10.0/plugin/importResolver/mod.ts";
import { pluginChainResolver } from "https://deno.land/x/denopack@0.10.0/plugin/chainResolver/mod.ts";
import { myPlugin } from './myPlugin.js';
import { pluginTerserTransform, RollupOptions, useCache } from "https://deno.land/x/denopack@0.10.0/mod.ts";

const OLVersion = '6.4.3';

const config: RollupOptions = {
  plugins: [
    pluginChainResolver(myPlugin(), pluginImportResolver()),
    ...useCache(),
    pluginTerserTransform({
      module: true,
      compress: true,
      mangle: true
    })
  ],
  input: './lib/oldeps.js',
  output: {
    banner: `/* OL version ${OLVersion} ${new Date().toISOString()} */`,
    file: "lib/ext/ol.js",
    format: "esm",
    sourcemap: true
  }
};

export default config;
