import { resolver } from "https://deno.land/x/denopack@0.10.0/util/resolver.ts";
import { resolve } from "https://deno.land/x/importmap/mod.ts";
import { fromFileUrl } from "https://deno.land/std/path/mod.ts";

export function importMapPlugin(options) {
  return {
    name: "importMapPlugin",
    resolveId: (importee, importer) => {
      // if importer is from local filesystem, convert to baseURL, i.e. remove protocol and cwd
      let baseURL = importer;
      if (importer && importer.startsWith('file://')) {
        baseURL = fromFileUrl(importer).replace(Deno.cwd(),'')
      }
      let matchedAddress = resolve(importee, options.importMap, baseURL);
      if (matchedAddress.startsWith('/')) {
        matchedAddress = `file://${Deno.cwd()}${matchedAddress}`;
      }
      return resolver(matchedAddress, importer);
    }
  };
};
