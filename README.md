# map-make

A script and code registry to create simple maps using [OpenLayers](http://www.openlayers.org) with no need to know or code Javascript: simply specify options in a form or define the same in a json object or custom element.

## Objective
Simplify map creation for those with little or no knowledge of Javascript or cartography.
Also helps developers try out different options.

## Current features
- raster source definitions stored in a registry (`lib/registry/sources`); pretty much any raster source supported by OL can be added to this
- GeoJSON, KML and GPX vector sources can be loaded and displayed over the raster source
- by default, maps with vector data will initially be zoomed to the extent of the data;
  those without will be zoomed to the maximum extent of the projection;
  this can be overridden by specifying a center and zoom level
- raster sources can be in different projections, and can be made in/visible by the layerswitcher provided by default
- the layerswitcher will automatically reproject vector features when the projection of the underlying raster source changes (OL's raster reprojection is not used; the view is simply redisplayed using the nearest zoom level for the new projection)
- uses the default OL zoom and scaleline controls, to which other widgets such as cursor position display, tooltips and feature info popups can be added; these widgets are also stored in a registry (`lib/registry/components`)
- custom feature styles can be specified for each vector source
- vector data/features can be drawn and moved/edited; this includes splitting and joining of linestrings
- map div uses 100% of screen viewport so keyboard arrows can pan map
- should be usable on both mouse/keyboard (desktop/laptop) and touch-screen (mobile) devices

## Usage
The main html file `map-make.html` is all that needs to be installed. When loaded in the browser, this will display the main toolbar which enables you to define which sources and tools you wish to use.

This is fine for one-off maps, but is unwieldy for maps you want to reuse, so the *map definition* (mapDef) can be saved for future use.

This can be a JSON object stored in a file which can be loaded from a url. It can also be a `<map-def>` custom element defined in the HTML file.

In addition, parameters can be specified as key-value pairs in the query string.

There are some sample mapDefs and sample HTML files to load them in  `samples/`. See [Usage file](usage.md) for more detailed instructions and further examples.

## Technical details
The JS source is in `lib/` and is modularised in ES2015 module syntax (`import`/`export`). It runs entirely in the browser, using the [jsDelivr](https://cdn.jsdelivr.net/) CDN to load the appropriate modules direct from this Github repo. The initial entry point is from the HTML file with other modules loaded dynamically from code using `import()`.

For more info on registry entries, see the Readme in the appropriate section of `lib/registry`.

Until version 3.1, the OL code was compiled into a separate build imported by the map-make modules, but since 3.1 the OL and map-make code has been built together, split into modules for each of the different entry points.

`map-make.html` loads `initloader.js` as the initial bootstrap, by default from `dist` on Github `master`, served from jsDelivr. This is a standard script, not a module. A field in `initloader` defines the latest version, and by default, it loads CSS from `dist/css/` for this version, and modules from `dist` for this version, using `initloader`'s URL as the base URL. This can however be overridden to enable loading a different version or from localhost. A test HTML could, for example, load a local `initloader`, and both CSS and base URL can be defined in a `data-configVars` attribute in the `<script>` tag:

```html
<script data-configVars='{"css":"../another/path/css/map-make.css","baseURL":"./further/path/map-make/lib/"}' src="../map-make/lib/initloader.js"></script>
```

A new version can thus be pushed to Github, and tested there; only when the release tag is added, and the `tag` field is changed in `initloader`, will this be used by default. See below for more on the release procedure, and `initloader.js` source for more info.

### External libraries
Besides OL, a modular build of [Proj4js](http://proj4js.org/) is used by the projection modules (`registry/projections`), [slideout.js](https://mango.github.io/slideout/) by the `toolbar` component, and [Awesomplete](https://leaverou.github.io/awesomplete/) by the `addlayer` component for autocompletion. Until these libraries produce ES-module versions, the last two are wrapped in an `export default` so they can be imported. See `lib/registry/projections/Readme.md` for details of the Proj4js custom build. The CSS for OL, Font Awesome and Slideout is combined into one file (`css/map-make.css`), which is minified into `dist/css/`; that for Awesomplete is loaded from CDN from the `addlayer` component. A custom version of the [Font Awesome webfont](http://fontawesome.io/) including only those glyphs used is loaded by `map-make.css`.

### More on `lib` and `dist`
As discussed above, the source is in `lib`, with a built/minified version in `dist`. The source imports OL modules using `ol/...` specifiers. An import map can then determine where `ol/` should be loaded from - for example, from localhost or from the repo. The build process takes these modules, also using an import map to load the OL code from the repo, and builds each of the entry modules into `dist`.

So, `lib/` contains:
* uncompressed module sources which can be loaded for testing on localhost
* compressed code for external libraries in `registry/components/ext/`; these are in a simple `export default` wrapper so they can be loaded as dependencies
* component HTML in `registry/components/*.html.js` are `<template>` elements in a simple `export default` wrapper so they can be loaded as dependencies

`dist/` is built from `lib` using [deno-rollup](https://deno.land/x/drollup), a port of Rollup for Deno, with `drollup.split.js` as the config file. This is run with `deno run -A --unstable ./drollup.split.js`, which combines the map-make and OL code, and splits into modules corresponding to the dynamically imported map-make modules. This uses an import map to define where the external source is loaded from; see [build page](OLbuild.md) for more details. The modules are minified using deno-rollup's Terser plugin, and using the `module` option so top-level names can be mangled. `initloader.js` can be edited manually.

The component `ext/` files are included in the build, but the `proj4js` files are at the moment kept external.

`dist/` also contains `css` and `font` directories.

## Raster sources
Some source providers require an API code to be given when fetching tiles; these are specified in the appropriate source files, and should be provided at runtime in the map definition.

## Limitations
Only 1 raster layer can be active/visible at a time.

At present, there is no error validation at all.

Because this software is based on new language features like modules, it will not work in old browsers such as IE.

## Future plans
See issues.

## Contributions
are welcome, as are all good ideas on how this can be developed further.

## Release process
Code is loaded from a release tag. As mentioned above, which release tag to use is defined in `initloader.js`. So:
- changes can be committed and pushed to Github without affecting the loaded code
- for new release, add a new tag (`git tag n.n.n`) and `git push --tags`
- change `initloader.js` to use new tag/release; when pushed to Github, this release will be used once jsDelivr's cache has cleared.
