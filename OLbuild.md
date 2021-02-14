### Goals
* load OL source in browser without installing
* create build with OL source without installing
* load OL build in browser

### Basic tools
- import maps: supported in [Deno](https://deno.land/manual@v1.6.2/linking_to_external_code/import_maps) and [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=848607) (by default probably from v89), Node Rollup partially with plugin, deno-rollup with plugin, denopack with plugin (denopack does not work with 1.7.0, so installed `deno163` and edited `~/.deno/bin/denopack` to use it)
- jspm.dev or esm.sh can serve npm packages as ES module; jspm serves zipped file which rollup import map plugin can't use; esm.sh serves unzipped file
- deno info xxx (gives dependency graph)
- rollup/terser in Node; needs
    - [`rollup-plugin-url-import`](https://github.com/thgh/rollup-plugin-url-import) to resolve and bundle remote urls
    - [`rollup-plugin-import-map`](https://www.npmjs.com/package/rollup-plugin-import-map) to use import maps; marks urls as external, so needs changing/hacking to work in conjunction with `url-import`; doesn't currently support generic addresses
- `deno-rollup` (Rollup for Deno) supports rollup for remote urls, uses `denopack` Terser plugin, and needs new plugin for import map support (`denopack` itself seems to be inactive)

### External deps
#### OL
- rbush (used in layer/BaseVector, source/Vector, interaction/Modify)
- pbf (used by MVT)
- ol-mapbox-style (in package.json, but only used in an example)

#### proj
defs and reprojection modules

#### Solutions
* for rbush/pbf (always built):
    - import map: map `rbush` with https://jspm.dev/npm:rbush@3.0.1!cjs (faster on Chrome) or https://esm.sh/rbush (Rollup with plugin)
    - deno-rollup can use a simple plugin to map 'rbush' and 'ol/'
    - if other bundlers support import maps, could edit ol code to use url
    - better would be for rbush/pbf to provide ES-module version on npm/gh
* for proj:
    - bundle with user code, or download so can use relative address
    - hard-coded as `'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/...`; would have to be changed on new version (then again, probably won't happen very often)
    - import map would be better, but can only use when implemented in all browsers

### Alternative strategies
1. code entry points as `https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/...`; this means all entry points have to be changed every time new version
2. code entry points as `ol/...`, and use import map to map to jsdelivr
3. code entry points as `deps.js`, and then have different `deps.js` files; good practice for dynamic imports/loading with code splitting?
    * default `deps.js` has `export * from './ext/ol.js'` (single-build file)
    * `depsfromoldeps.js` has `export * from './oldeps.js'`, which re-exports all ol imports: for example, `export { default as Map } from 'ol/Map.js';`, i.e. named exports
    * `depsfromoldepscdn.js` has `export * from './oldepscdn.js'`, which exports from jsDelivr, e.g. `export { default as Map } from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/Map.js';` (of course, all imports in `oldepscdn.js` have to be changed whenever new version)


### Module conversion
* user-code modules `import { Class/function } from './deps.js';`, and then access imported name, for example, `new Map()`; all old `ol.***` function calls etc in modules have to be changed to use imported name, e.g. `controlDefaults`; beware of conflicting names if all in one deps file.

### One-file build
One build containing all OL functions used, but without user code, as with previous version:
* build from `lib/oldeps.js` to `lib/ext/ol.js` using `drollup.js` (328k as opposed to 215k with Closure advanced = +53%) `deno run -A --unstable ./drollup.js`; uses custom `importMapPlugin.js`
* Lume copies/minifies `lib/` to `dist/`
* disadvantage of importing everything in one file is that there is limited tree-shaking (but see multi-file below)

### Loading options
* browser loading build (import map not needed): uses `deps.js`, which re-exports all imports from the build file `ext/ol.js` (if loading from `lib/` with import map, comment out `lib/ext/ol.js` remapping line in html)
* browser loading source with import map: also uses `deps.js`, but with build file `/lib/ext/ol.js` mapped to `/lib/oldeps.js` (could also be used with `dist/` if needed)
* browser loading source without import map: swap `deps.js` for `depsfromoldepscdn.js`

### Multi-file build
Code splitting; include map-make code in build
* can use deno-rollup with custom `importMapPlugin.js`
* use `deno run -A --unstable ./drollup.split.js`, which:
    * changes output config to dir
    * lists all entry points
    * outputs to `public/`
* can use/swap out `depsfromoldeps.js` if no import map

#### Issues
* addLayer import() wrong dir ref
* projection cache not being updated
* deno-rollup creates 73k olMap and 113k KML (OL) + 17k (total ~200k) for minimal map; + 71k vectors, 35k draw, 34k TileImage, and small files for everything else. Total size 484K. So OL has to be split better: exclude vectors from Map/View; remove 3857/4326 variants; manage formats/geoms better
* not worth the bother until better tree-shaking in OL

### Split build without deps.js
* user code needs to refer to `ol/...` (for building with import map)
* can use `deno run -A --unstable ./drollup.split.js` (output to sep dir so can compare)


### Other examples
- my olexamples use absolute url for each import
- ol's examples use relative addresses from src, e.g. `import Map from '../src/ol/Map.js';`, which is then built with `parcel build --experimental-scope-hoisting --public-url . index.html`; this creates small minified `simple.js`, plus 240kB `common.js`; displays js with Node-style addresses with no `.js`, e.g. `import Map from 'ol/Map';`, which is what is also given as example in Readme

### Issues
* it/pt: http only - no longer works in Chrome
* formats could be imported/created when needed; ditto mongo. Requires going async

#### OL
* olView imports vectors whether use them or not
* format/geometry deps wrong way round; separate read/write
* PluggableMap not much use any more


split code test with atlasde:
- startup in olMap:
    - on initial View instantiation, this.projection_ set with createProjection for 3857
    - createResolutionConstraint runs createProjection for 3857
    - createCenterConstraint runs createProjection for 3857
- adding de: in KML chunk:
    - add all 3857/4326 projections, + 25832
    - get() for all codes from cache, inc 25832
    - back in olMap:
    - this.projection_ set to null with createProjection for 25832; breakpoint for createProjection() in KML is not being triggered, so is not being run
    - createResolutionConstraint runs createProjection for 25832, which also returns null, and then tries to use projection.extent, which doesn't exist


### Resolving
Rollup [`resolveId()`](https://rollupjs.org/guide/en/#resolveid) has 2 params `source` (importee) and `importer`; the latter will be empty for entry points. return null to defer to other `resolveId()` and/or Rollup's default; return false to treat as external (i.e. not included in build).

drollup has a standard rollup plugin rollup-plugin-deno-resolver/denoResolver.ts, containing `resolveId()` and `load()`. The former converts to file url:
- `resolveId(source, importer)`: returns source if url; if importer and is url, returns source.href resolved to importer; if importer and not url: if source absolute, return source, else return source resolved to importer; else return source
- `parse(result of resolveID)`: if absolute, return toFileURL, else tries `new URL(source)` or `new URL(source, getUrlBase())`; `getUrlBase` returns a file:// url of cwd
- if that returns null, let Rollup handle
- checks if url exists (tries adding '.js' to cater for extensionless specifiers)

https://github.com/timreichen/importmap/blob/master/mod.ts has:
- `createAsURL(specifier, baseURL)` which does:
    - if baseURL and relative specifier, `return new URL(specifier, baseURL).toString()`
    - else `return new URL(specifier).toString()`
- ` resolveImportMatch(normalizedSpecifier, specifierMap)` which matches if:
    - key in Map === normalizedSpecifier
    - key in Map endsWith('/')  && normalizedSpecifier.startsWith(key)
- `resolve(specifier, importMap, baseURL)` returns:
    - if `resolveImportMatch()` where `normalizedSpecifier` is `createAsURL(specifier, baseURL)`, return the matched url
    - else return `createAsURL(specifier, baseURL)`
Also handles scopes.


### Denopack default
config file imports `useCache()` from `plugin/hooks.ts`, which uses:
- `plugin/importResolver.js`, which uses `util/resolver.js`
- `loadFile()` from `plugin/fileLoader/mod.ts`, which expects `file://` or `http://` and uses `readfile`/`fetch` as appropriate.

Denopack uses browser version of Rollup, which doesn't allow filesystem reads. So `util/resolver.js` always returns with protocol:
If no importer:
- if importee has protocol: return importee
- if no protocol:
    - if absolute, `return new URL(`file:///${importee}`).toString();`
    - if relative, `return new URL(`file:///${path.join(Deno.cwd(), importee)}`).toString();`
If importer:
- if importee has protocol: return importee
- if not:
    - if importer has protocol, `return new URL(importee, importer).toString();`
    - if importee absolute path: `return resolver(importee, undefined);`, i.e. as above with no importer
    - else resolve as with no importer, `return resolver(`file:///${path.join(path.parse(importer).dir, importee)}`, undefined);`
