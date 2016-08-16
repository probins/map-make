#### Component modules
All components are subclasses of the Component class; see component.js for more details.

To remove clutter from small screens such as mobile phones, most widgets are stored in a slideout menu.

##### Loaded automatically
The toolbar (`toolbar.js`) is loaded on start (into document.body) into the slideout menu. It contains buttons to load other optional widgets. Some of these load further content into the toolbar.

The dropdown zoom control (`zoom.js`) is a map widget (loaded with map.addControl()).

The layerswitcher (`layerswitcher.js`) is loaded on start, but not displayed until there is more than 1 layer to display/switch, at which point the switching boxes are added to the toolbar.

`popup.js` is used by featuredisplay/draw and not loaded independently.

##### Optional
These initially appear as toolbar buttons, which when clicked either add content to the toolbar or add a widget to the map.

###### Toolbar
* Add a layer (`addlayer.js`)
* Go to (`center.js`)
* Geolocation (`geolocation.js`)
* Place search (`placesearch.js`)
* Use map definition (`mapdef.js`)

##### Map widgets
* Mouse position (`mouseposition.js`) (not useful in devices without a mouse)
* Draw (`draw.js`); adds a dropdown menu of draw tools to the map, and also adds a vector layer to store the drawn features. The output of drawn features appears in the toolbar
* vector widgets: the buttons only appear when a vector layer has been added, either by the user or by the draw component
** Popup ('featuredisplay.js`); displays feature details in a popup when the feature is clicked/selected
** Tooltip (`tooltip.js`) shows name/title of vector feature on mouseover (not useful in devices without a mouse)

##### HTML/CSS
Stored in *.html files, one for each component with DOM content. `html2register.js` converts these to a pseudo-module *.htm in `System.register` format, analagous to SystemJS plugin. These are then imported by the appropriate js file.
