# createmap

A script and code registry to create maps using OpenLayers 3 by simply defining a json object.

*Warning: this is at the moment a proof of concept demo, liable to change at any moment without notice. Use at your own peril.*

## Objective

Simplify map creation for those with little or no knowledge of Javascript or cartography.
Also helps developers try out different options by simply changing a json object.

## Current features

- raster source definitions stored in registry; pretty much any raster source supported by OL3 can be added to this
- vector sources using any of the vector formats supported by OL3 can be loaded and displayed over the raster source
- by default, maps with vector data will initially be zoomed to the extent of the data;
  those without will be zoomed to the maximum extent of the projection;
  this can be overridden by specifying a center and zoom level
- raster sources can be in different projections, and can be made in/visible by the layerswitcher provided by default
- the layerswitcher will automatically reproject vector features when the projection of the underlying raster source changes
- uses the default OL3 zoom control, to which other widgets such as scaleline, mouse position display, tooltips and feature info popups can be added
- custom feature styles can be specified for each source

## Limitations

The script cannot be finalised until the OL3 api is finalised. In particular, at present, uses 2 functions that are not in the current OL3 api. For this reason, has to use build with simple optimizations:

1. source.getProjection()
2. vectorLayer.featureCache_.idLookup_ (getFeatures)

Only 1 raster layer can be active/visible at a time.

At present, there is no error validation at all.

## Future plans

See issues.

## Contributions

are welcome, as are all good ideas on how this can be developed further.