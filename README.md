# map-make

A script and code registry to create simple maps using [OpenLayers 3](http://www.openlayers.org) by simply filling in a form or defining a json object or custom element.

## Objective

Simplify map creation for those with little or no knowledge of Javascript or cartography.
Also helps developers try out different options.

## Current features

- raster source definitions stored in a registry (`lib/registry/sources`); pretty much any raster source supported by OL3 can be added to this
- GeoJSON, KML and GPX vector sources can be loaded and displayed over the raster source
- by default, maps with vector data will initially be zoomed to the extent of the data;
  those without will be zoomed to the maximum extent of the projection;
  this can be overridden by specifying a center and zoom level
- raster sources can be in different projections, and can be made in/visible by the layerswitcher provided by default
- the layerswitcher will automatically reproject vector features when the projection of the underlying raster source changes
- uses the default OL3 zoom and scaleline controls, to which other widgets such as mouse position display, tooltips and feature info popups can be added; these widgets are also stored in a registry (`lib/registry/components`)
- custom feature styles can be specified for each vector source
- vector data/features can be drawn and moved/edited; this includes splitting and joining of linestrings
- map div uses 100% of screen viewport so keyboard arrows can pan map
- should be usable on both mouse/keyboard (desktop/laptop) and touch-screen (mobile) devices

## Usage

The main html file `map-make.html` is all that needs to be installed. When loaded in the browser, this will display the main menu which enables you to define which sources and tools you wish to use.

This is fine for one-off maps, but is unwieldy for maps you want to reuse, so the *map definition* (mapDef) can be saved for future use.

This can be a JSON object stored in a file which can be loaded from a url. There are some examples of mapDef files in `https://github.com/probins/map-make-samples`.

It can also be a `<mapdef>` custom element defined in the HTML file.

In addition, parameters can be specified as key-value pairs in the query string.

See [Usage file](usage.md) for more detailed instructions and examples.

## Technical details

The code is modularised, and runs entirely in the browser, using the [JSPM](http://jspm.io/) CDN to load the appropriate modules direct from this Github repo. This uses HTTP/2 to enable bulk-loading of modules and remove the need to bundle. The modules are written in `lib/` using ES2015 `import`/`export`, and these are currently converted to `System.register` format using Babel, stored in `register`. These modules are then loaded in the browser using the [system register loader](https://github.com/ModuleLoader/system-register-loader). Once ES2015 modules are implemented in browsers, this conversion step and loader will no longer be needed. Instead the ES6 modules will be loaded with `<script type="module">`.

Unfortunately, at the moment the OL3 code is not compatible with modular loading, so it's not possible to load the relevant OL3 code with each module. This should change as OL3 moves away from the Closure library, which should speed up the initial load. At the moment, a custom build of all the OL3 code used is loaded; no account is taken of which components are needed for a specific map.

For more info on registry entries, see the Readme in the appropriate section of `lib/registry`.

`map-make.html` loads `initloader.js` as the initial bootstrap; this is a standard script, not a module. By default, this loads from JSPM, but is configurable with a `data-configVars` attribute, for example, for testing on localhost.

### External libraries
Besides OL3, [Proj4js](http://proj4js.org/) and [slideout.js](https://mango.github.io/slideout/) are used. Polyfills for `Promise` and `fetch()` are loaded if not natively supported. The [Font Awesome webfont](http://fontawesome.io/) is also used, and the `add layer` module uses [Awesomplete](https://leaverou.github.io/awesomplete/) for autocompletion. Slideout is loaded from CDN, but OL3, Proj4js and Awesomplete are loaded with ES2015/System.register wrappers instead of the supplied UMD or other wrapper. See `lib/registry/projections/Readme.md` for details of the Proj4js custom build.

## Raster sources
Some source providers require an API code to be given when fetching tiles; these are specified in the appropriate source files, and should be provided at runtime in the map definition.

## Limitations

Only 1 raster layer can be active/visible at a time.

At present, there is no error validation at all.

## Future plans

See issues.

## Contributions

are welcome, as are all good ideas on how this can be developed further.
