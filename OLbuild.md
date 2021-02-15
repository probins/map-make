### Goals
* load OL source in browser without installing
* create build with OL source without installing
* load OL build in browser

### Basic tools
- import maps: supported in [Deno](https://deno.land/manual@v1.6.2/linking_to_external_code/import_maps) and [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=848607) (by default from v89), Node Rollup partially with plugin, deno-rollup with plugin, denopack with plugin (denopack does not work with 1.7.0, so installed `deno163` and edited `~/.deno/bin/denopack` to use it, but denopack seems to be inactive)
- jspm.dev or esm.sh can serve npm packages as ES module; jspm serves zipped file which rollup import map plugin can't use; esm.sh serves unzipped file
- deno info xxx (gives dependency graph)
- rollup/terser in Node; needs
    - [`rollup-plugin-url-import`](https://github.com/thgh/rollup-plugin-url-import) to resolve and bundle remote urls
    - [`rollup-plugin-import-map`](https://www.npmjs.com/package/rollup-plugin-import-map) to use import maps; marks urls as external, so needs changing/hacking to work in conjunction with `url-import`; doesn't currently support generic addresses
- `deno-rollup` (Rollup for Deno) supports rollup for remote urls, uses `denopack` Terser plugin, and has plugin for (partial) import map support

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
    - currently bundle-external, hard-coded as `'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/...`; would have to be changed on new version (then again, probably won't happen very often)
    - import map would be better, but can only use when implemented in all browsers
    - could bundle with user code, or download so can use relative address

### Alternative strategies
1. code entry points as `https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/...`; this means all entry points have to be changed every time new version
2. code entry points as `ol/...`, and use import map to map to jsdelivr
3. code entry points as `deps.js`, and then have different `deps.js` files
    * default `deps.js` has `export * from './ext/ol.js'` (single-build file)
    * `depsfromoldeps.js` has `export * from './oldeps.js'`, which re-exports all ol imports: for example, `export { default as Map } from 'ol/Map.js';`, i.e. named exports
    * `depsfromoldepscdn.js` has `export * from './oldepscdn.js'`, which exports from jsDelivr, e.g. `export { default as Map } from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@6.4.3/src/ol/Map.js';` (of course, all imports in `oldepscdn.js` have to be changed whenever new version)


### Module conversion
* user-code modules `import { Class/function } from 'ol/...';`, and then access imported name, for example, `new Map()`; all old `ol.***` function calls etc in modules have to be changed to use imported name, e.g. `controlDefaults`; beware of conflicting names.

### Loading options
* browser loading source with import map: use `baseURL: lib/` (could also be used with `dist/` if needed)
* browser loading split-file build (import map not needed): use `baseURL: split/`

### Split build (without deps.js)
Code splitting; include map-make code in build
* user code needs to refer to `ol/...` (for building with import map)
* can use `deno run -A --unstable ./drollup.split.js`, though first clear dir (everything other than `css/`, `font/`, `initloader.js`)
    * changes output config to dir
    * lists all entry points
    * outputs to `split/`
    * `myproj` is external; component exts are bundled in
* creates 98k olMap, 27k size, 12k toolbar (total 156k) for minimal map; + 140k vectors, 37k draw, 34k TileImage, and small files for everything else. Total size 492K.
* `initloader.js` needs to be Tersered to `dist/` whenever changed
* OL should have better tree-shaking:
    * View imports vectors whether used or not
    * remove 3857/4326 variants
    * format/geometry deps wrong way round; separate read/write
    * PluggableMap not much use any more (to be removed in v7)


### OL's examples
Use relative addresses from src, e.g. `import Map from '../src/ol/Map.js';`, which is then built with `parcel build --experimental-scope-hoisting --public-url . index.html`; this creates small minified `simple.js`, plus 240kB `common.js`; displays js with Node-style addresses with no `.js`, e.g. `import Map from 'ol/Map';`, which is what is also given as example in Readme


### OL imports
ol is imported in:
* mongo.js (Feature, GeoJSON), olMap.js (Map, controlDefaults, ScaleLine, GroupLayer, transform, View, Control), rasters.js (Projection, transformExtent), select.js (Select, unByKey), vectors.js (transformExtent, VectorSource, VectorLayer, Style, Stroke, Fill, Circle)
* registry/components/center.js (transform), cursorposition.js (MousePosition), draw.js (Draw, Modify, unByKey, LineString, Feature), geolocation.js (Overlay, transform), mapdef.js (transform), placesearch.js (transform), popup.js (Overlay), serialise.js (Feature), tooltip.js (Select)
* registry/projections/common.js (addProjection, Projection, addCoordinateTransforms)
* registry/sources/bing/common.js (Bing, TileLayer), gb/os.js, it/pcn.js, it/pcn32633.js, pt/dgt/sc.js, pt/dgt/sc200.js, si/gurs.js, tileimage.js (TileGrid, TileImage, TileLayer), wms.js (TileGrid, TileLayer, TileWMS), wmts.js (WMTSTileGrid, TileLayer, WMTS), xyz.js (TileGrid, TileLayer, XYZ)

#### Xref ol classes/functions to map-make modules
"ol.Feature": mongo, components/draw, components/serialise
"ol.Map": olMap
"ol.Overlay": components/geolocation, components/popup
"ol.View": olMap
"ol.control.Control": olMap
"ol.control.MousePosition": components/cursorposition
"ol.control.ScaleLine": olMap
"ol.format.GeoJSON": mongo, vectors
"ol.format.GPX": vectors
"ol.format.KML": vectors
"ol.geom.LineString": components/draw, mongo
"ol.geom.MultiLineString": components/draw, mongo
"ol.geom.Point": components/draw, mongo
"ol.geom.Polygon": components/draw, mongo
"ol.interaction.Draw": components/draw
"ol.interaction.Modify": components/draw
"ol.interaction.Select": select
"ol.layer.Group": olMap
"ol.layer.Tile": sources/*
"ol.layer.Vector": vectors
"ol.proj.Projection": projections/common
"ol.source.BingMaps": sources/bing/*
"ol.source.TileImage": sources/srtm/*
"ol.source.TileWMS": sources/wms, sources/gb/os, sources/it/pcn..., sources/pt/dgt/, sources/si/gurs
"ol.source.Vector": vectors
"ol.source.WMTS": sources/wmts
"ol.source.XYZ": sources/xyz
"ol.style.Circle": vectors
"ol.style.Fill": vectors
"ol.style.Image": NOT USED
"ol.style.Stroke": vectors
"ol.style.Style": vectors
"ol.tilegrid.TileGrid": as source.TileWMS
"ol.tilegrid.WMTS": as source.WMTS

"ol.Observable.unByKey": components/draw, select
"ol.control.defaults": olMap
"ol.proj.addCoordinateTransforms": projections/common
"ol.proj.addProjection": projections/common
"ol.proj.transform": olMap, components/center,geolocation,mapdef,locationsearch,
"ol.proj.transformExtent": rasters, vectors
