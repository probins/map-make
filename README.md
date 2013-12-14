# createmap

A script and code registry to create simple maps using OpenLayers 3 by simply filling in a form or defining a json object.

*Warning: this is at the moment a proof of concept demo, liable to change at any moment without notice. Use at your own peril.*

## Objective

Simplify map creation for those with little or no knowledge of Javascript or cartography.
Also helps developers try out different options.

## Current features

- raster source definitions stored in registry; pretty much any raster source supported by OL3 can be added to this
- vector sources using any of the vector formats supported by OL3 can be loaded and displayed over the raster source
- by default, maps with vector data will initially be zoomed to the extent of the data;
  those without will be zoomed to the maximum extent of the projection;
  this can be overridden by specifying a center and zoom level
- raster sources can be in different projections, and can be made in/visible by the layerswitcher provided by default
- the layerswitcher will automatically reproject vector features when the projection of the underlying raster source changes
- uses the default OL3 zoom control, to which other widgets such as scaleline, mouse position display, tooltips and feature info popups can be added
- custom feature styles can be specified for each vector source

## Usage

The map to be displayed is defined in a *map definition* (mapDef), which can be specified in:
- a json object; this is the most flexible method. See `mapDefs/` for some examples. This can be defined in a div tag with the id 'mapDef' `<div id="mapDef">url</div>` (see `local.html` for an example), or specified in the query string `?mapDef=url`
- some parameters can be specified as key-value pairs in the query string
- if there is no mapDef or query string defined, a form will be displayed where the query string values can be entered

## Technical details

The code is modularised, and runs entirely in the browser, using [jspm](http://jspm.io/) to load the appropriate modules.

raster sources:
- export a `getLayers` function, which returns the appropriate layer/source, along with the `projCode`, `extent` and `resolutions` properties if these are not the default worldwide EPSG:3857 values
- have an ```id``` property, used in the layer switcher
- See Bing and OSM for examples of EPSG:3857, and others for other projections.

## Limitations

The script cannot be finalised until the OL3 api is finalised. In particular, at present, uses 2 functions that are not in the current OL3 api. For this reason, has to use custom build or build with simple optimizations:

1. source.getProjection()
2. vectorLayer.getFeatures()

Only 1 raster layer can be active/visible at a time.

At present, there is no error validation at all.

## Future plans

See issues.

## Contributions

are welcome, as are all good ideas on how this can be developed further.