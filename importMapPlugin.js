import { resolve } from "https://deno.land/x/importmap@0.1.4/mod.ts";
import { fromFileUrl, join, toFileUrl } from "https://deno.land/std@0.84.0/path/mod.ts";

export function importMapPlugin(options) {
  return {
    name: "importMapPlugin",
    resolveId: (source, importer) => {
      let baseURL = importer;
      const cwd = Deno.cwd();
      // if importer is a file:// URL, convert to baseURL, i.e. remove protocol and cwd
      if (importer && importer.startsWith('file://')) {
        baseURL = fromFileUrl(importer).replace(cwd,'')
      }
      // resolve() only uses baseURL if source not a URL
      let matchedAddress = resolve(source, options.importMap, baseURL);
      // if returned address not a resolved URL, convert to file URL
      const URL = /^(https?|file):\/\//;
      if (!URL.test(matchedAddress)) {
        matchedAddress = toFileUrl(join(cwd, '/', matchedAddress)).toString();
      }
      return matchedAddress;
    }
  };
};
