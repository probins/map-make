### Basic tools
- import maps: supported in [Deno](https://deno.land/manual@v1.6.2/linking_to_external_code/import_maps) and [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=848607) (by default probably from v89), Node Rollup partially with plugin, denopack with plugin
- jspm.dev or esm.sh can serve npm packages as ES module; jspm serves zipped file which rollup import map plugin can't use; esm.sh serves unzipped file
- deno info xxx (gives dependency graph)
- rollup/terser; needs
    - [`rollup-plugin-url-import`](https://github.com/thgh/rollup-plugin-url-import) to resolve and bundle remote urls
    - [`rollup-plugin-import-map`](https://www.npmjs.com/package/rollup-plugin-import-map) to use import maps; marks urls as external, so needs changing/hacking to work in conjunction with `url-import`; doesn't currently support generic addresses
- `denopack` (Rollup/Terser for Deno) supports rollup for remote urls, but needs new plugin for import map support

### External deps
#### OL
- rbush (used in layer/BaseVector, source/Vector, interaction/Modify)
- pbf (used by MVT)
- ol-mapbox-style (in package.json, but only used in an example)

#### myproj
defs and reprojection modules

Solutions:
- import map: map `rbush` with https://jspm.dev/rbush (faster on Chrome) or https://esm.sh/rbush (Rollup with plugin)
- denopack can use a simple plugin to map 'rbush', 'myproj' and 'ol/'
- if other bundlers support import maps, could edit ol code to use url
- better would be for rbush/pbf to provide ES-module version on npm/gh

### Strategies
1. code entry points as `https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/...`
2. code entry points as `ol/...`, and use import map to map to jsdelivr
3. code entry points as `deps.js`, and then have 2 (or more) different `deps.js` files - no good for dynamic imports/loading with code splitting


### Module conversion
* put all ol imports in `oldeps.js`: for example, `export { default as Map } from 'ol/Map.js';`, i.e. named exports
* `oldeps.js` can be replaced using import map with alternative `oldepscdn.js`, which has CDN imports, e.g. `export { default as Map } from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/Map.js';`
* map-make modules `import { Class/function } from './deps.js';`, and then access from import, for example, `new Map()`; all old `ol.***` function calls etc in modules have to be changed to use imported name, e.g. `controlDefaults`; projections/common.js had conflicting names
* as supplied, `deps.js` re-exports all imports from the build file (see below)
* disadvantage when importing without build is that all modules are imported every time

#### One-file build
One build containing all functions used, as with previous version:
* build from `lib/oldeps.js` to `lib/ext/ol.js` using `denopack.config.ts` (328k as opposed to former 215k = +53%) - bug in denopack means output has to be moved
* use default `deps.js`, which does `export * from './ext/ol.js';`; comment out `deps.js` remapping line in html import map
* disadvantage of importing everything in one file is that there is limited tree-shaking (but see multi-file below)

#### Import from source
* use `oldeps.js` instead of build file: inserting `"/lib/ext/ol.js": "/lib/oldeps.js"` into browser import map imports from `oldeps.js` instead of `deps.js`. For use without import map, there is a separate file `depsfromoldeps.js` which can be swapped into `deps.js`, and does `export * from './oldeps.js';`

#### Multi-file build
Code splitting; include map-make code in build
* can use denopack with custom import map `myPlugin.js`
* create `denopack.splitconfig.ts`
* change output config to dir, and list all entry points
* use `depsfromoldeps.js` (have to swap out until import map works)
* issue with projection cache not being updated
* minimal map is 187K; +88K for addLayer (adds rasters/vectors); +157K for OSM (TileImage and KML). So this is actually > single-file build. Total size 616K - nearly double single-file. So OL has to be split better: exclude vectors from Map/View; remove 3857/4326 variants; manage formats/geoms better
* not worth the bother



- my olexamples use absolute url for each import
- ol's examples use relative addresses from src, e.g. `import Map from '../src/ol/Map.js';`, which is then built with `parcel build --experimental-scope-hoisting --public-url . index.html`; this creates small minified `simple.js`, plus 240kB `common.js`; displays js with Node-style addresses with no `.js`, e.g. `import Map from 'ol/Map';`, which is what is also given as example in Readme


### Issues
* draw move doesn't work doesn't work properly in current prod; works up to 2.5.2 but not in 2.5.3
* ch (prob outdated -changed to current)/it (http)/pt (http) don't work
* formats could be imported/created when needed; ditto mongo
* catch errors from all `import()`

#### OL
* olView imports vectors whether use them or not
* format/geometry deps wrong way round
* PluggableMap not much use any more


split code test with atlasde:
- startup in olMap:
    - on initial View instantiation, this.projection_ set with createProjection for 3857
    - createResolutionConstraint runs createProjection for 3857
    - createCenterConstraint runs createProjection for 3857
- adding de: in KML:
    - add all 3857/4326 projections, + 25832
    - get() for all codes from cache, inc 25832
    - back in olMap:
    - this.projection_ set to null with createProjection for 25832; breakpoint for createProjection() in KML is not being triggered, so is not being run
    - createResolutionConstraint runs createProjection for 25832, which also returns null, and then tries to use projection.extent, which doesn't exist
