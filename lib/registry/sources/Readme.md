#### Raster source modules
If the projection is not one of those natively supported by OL3, the source module imports the relevant projection module. It exports a `getLayers` function, which returns the appropriate layer/source, along with an `id` property, used in the layer switcher. The `projCode`, `extent` and `resolutions` properties are also exported if these are not the default worldwide EPSG:3857 values; these are used for creating the view.

See Bing and OSM for examples of EPSG:3857, and others for other projections.

Some sources require an API key. If this is the case, it should be in the options object passed to the `getLayers` function.

`list.json` is a JSON array of entries in this registry, used by autocomplete on `add layer`. Entries added to the registry should be added to this list if they are to appear in the autocomplete list.
