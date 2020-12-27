import { resolve } from "https://deno.land/x/importmap/mod.ts"

const importMap = {
  "imports": {
    "ol/": "https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/",
    "/lib/ext/ol.js": "/lib/oldeps.js",
    "myproj/": "https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/",
    "rbush": "https://jspm.dev/rbush",
    "rbush/rbush.js": "https://jspm.dev/rbush"
  }
};

export function myPlugin() {
  return {
    name: "myPlugin",
    resolveId: (
      importee,
      importer
    ) => {
      if (importee.includes('ol.js')) {
        console.log(importee);
      }
      return resolve(importee, importMap);
    }
  };
}
