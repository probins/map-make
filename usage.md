### Some examples of how to use

#### Basic usage
- download/save the [map-make.html](https://raw.githubusercontent.com/probins/map-make/master/map-make.html) file to the URL where you wish to host it; some raster sources like OpenStreetMap can be displayed from any publicly accessible URL, such as on Google Drive or Dropbox; others will only work with a specified domain. You can save it to any name you like; it does not have to be called `map-make.html`
- load this file in your browser. You should see an empty map with the slideout menu on the left
- click on `Layers` and then `Add a layer`
- enter the raster layer you want to load; this should be the code listed at the top of one of those in the [sources registry](https://github.com/probins/map-make/tree/master/lib/registry/sources); for example `osm/osm`. Then click on `Add`. You should then see the OpenStreetMap displayed, and you can zoom in as you wish.
- click on the menu toggle in the map to hide the menu; click again to redisplay
- click on `Layers` again to hide this part of the menu, and then click on `Components`
- click on, for example, `Cursor position` to display the coordinates of the cursor on the current display (this is not useful on touch-screen devices; hide the menu so this displays properly); or on `Go to` to enter a particular coordinate to zoom to
- now add a vector file by going back to the `Layers` sections and entering the details. You can enter either a URL to load from an external server (must be CORS-enabled), or specify a file on your local disk. If you want to load a file from an external server which is not CORS-enabled (does not allow loading from a different domain), fetch the file in your browser directly, save it to your local disk, and then load from there. `Name/Identifier` is simply the name used in the layerswitcher.
- you can now hide/redisplay this vector file by clicking the appropriate box in the layerswitcher.

#### Saving and reusing a mapDef
- click on `Map definition`, and then on `Use map definition`
- click on `Create MapDef`, and you will see the JSON map definition in the text box below. Save this to a publicly accessible file, for example, called `mymapdef.json`. [Technical note: these files must be on a server which is CORS-enabled.]
- to use the stored mapDef, enter the URL in the `Map definition` section of the slideout menu and press Enter. Note that this will replace whatever map is currently displayed, so, if you want to keep this, make sure you save a mapDef for it before loading the new one.

As stated in the Readme, there are some sample mapDefs in [`map-make-samples`](https://github.com/probins/map-make-samples). For example, entering `https://cdn.jsdelivr.net/gh/probins/map-make-samples/mapDefs/cataloniaVectors.json` will load a map with 3 raster layers (Catalonia, Spain and OSM) and 2 vector files. Again, external servers must be authorised for cross-domain use (CORS).

#### Defining the map in the querystring
Most of the map definition stored in a mapDef can also be defined using the querystring. For example, instead of entering a mapDef URL in the `Map definition` section of the menu, you can load the HTML file with a `mapDef` parameter. For example, `map-make.html?mapDef=https://cdn.jsdelivr.net/gh/probins/map-make-samples/mapDefs/cataloniaVectors.json` will load the same mapDef used above. Entering `map-make.html?rasters=osm/osm,osm/opentopo&components=cursorposition,center` will load the OSM and OpenTopo maps with the cursorposition and center (Go to) components. The keys can be abbreviated: `rasters` -> `r`, `vectors` -> `v`, `components` -> `c`, `zoom` -> `z`.

As entering these parameters is rather laborious, this feature is probably more useful for one-off tests than for maps that are frequently used.

#### API keys
Some raster sources need an API key, which can be defined when adding the layer. Examples of a source definition with an API key can be found in the Bing, France and OSGB mapDef samples. To use this on your website, you must first register with the appropriate company/agency to get an API key specific to your site, and then enter this key in the mapDef when accessing these maps.

#### Dynamic map definitions
For technically advanced users, maps can also be defined in a custom map-def HTML element `<map-def>...</map-def>` in the html file; see `map-make-element.html` for an example. The advantage of this is that the element can be constructed programatically based on, for example, a URL template; for example, a program could convert the URL `maps/osm/line1` into an element loading the OSM raster together with the `line1` vector file, or `maps/opentopo/line2` might load the `line2` vector file with the OpenTopo raster tiles.
