// Proj4js = proj4;
Proj4js.defs['EPSG:3857'] = Proj4js.defs['EPSG:3785'];
// wait for scripts to load
window.onload = function() {
/** initialise namespace/global var (CM stands for 'create map' :-))
 * other scripts update this var when they are loaded.
 * Currently, options and tileSources are used.
 * Options are set in the html page.
 * valid options are:
 * - map:
 * -- target (creates one if not present)
 * -- controls: currently scaleline, latlonmouse (mousePosition in latlons),
 *    projectedmouse (mousePosition in projected coords)
 * -- noKeyboardPan: true (by default, keyboard pan/zoom are enabled on the
 *    viewport div; use this to override)
 * - view:
 * -- initial center {lat: nn, lon: nn} and zoom level
 *    By default maps with vectors zoom to the vector data
 *    and maps with no vectors zoom to the extent of the tile data
 * -- rotation
 * -- projection/projCode, resolutions set from tileSources;
 *    if no tileSources, projCode can be set, else 4326 used
 * -- noZoomToExtent: true (to override zoom to vector data extent)
 * - rasters: array of tileSources to be included
 * - vectors: array of vector sources each of which has:
 * -- url
 * -- parser (should be the name of the ol class: GeoJSON, KML, GPX ...)
 * -- attribution
 * -- optionally, style can be given to override ol defaults
 * tileSources
 *  these are defined in the registry scripts, included with a script tag.
 *  at the moment, ol3 does not handle tile-layer sources in different projections
 */
  CM = CM || {};
  CM.tileSources = CM.tileSources || {};

  var options = CM.options || {
    projCode: 'EPSG:4326'
  };
  var tileLayers = [], vectorLayers = [], views = {};
  var i = 0, s, defaultCenter, defaultView;
  
  var createView = function(layer) {
  // view options
  // default center is center of raster extents; default zoom 0
  	defaultCenter = layer.extent ? ol.extent.getCenter(layer.extent)
        : [0, 0];
    var center = options.center ?
        ol.proj.transform([options.center.lon, options.center.lat], 'EPSG:4326', layer.projCode)
        : defaultCenter;
    var viewOptions = {
      center: center,
      zoom: options.zoom || 0
    };
    if (layer.projCode) {
      viewOptions.projection = layer.projCode;
    }
    if (layer.resolutions) {
      viewOptions.resolutions = layer.resolutions;
    }
    if (options.rotation) {
      viewOptions.rotation = options.rotation;
    }
    return new ol.View2D(viewOptions);
  };

  // add raster sources
  if (options.rasters) {
    for (i, s = options.rasters; i < s.length; i++) {
      // this assumes correct tileSource defined
      var raster = CM.tileSources[s[i]];
      if (!views[raster.projCode]) {
      	// 1 view per projection
        views[raster.projCode] = createView(raster);
      }
      if (i == 0) {
        defaultView = raster.projCode;
      }
      // turn off layers not in default projection
      if (raster.projCode != defaultView) {
      	raster.layer.setVisible(false);
      }
      tileLayers.push(raster.layer);
    }
  }
  CM.views = views; //FIXME
  // add vector sources
  if (options.vectors) {
    for (i = 0, s = options.vectors; i < s.length; i++) {
    	var vectOpts = {
        source: new ol.source.Vector({
          url: s[i].url,
          attributions: [new ol.Attribution({
            html: s[i].attribution
          })],
          parser: new ol.parser[s[i].parser]()
        })
      };
    	if (s[i].stroke) {
        // change default style
        vectOpts.style = new ol.style.Style({
          symbolizers: [
            new ol.style.Stroke({
              color: s[i].stroke.color,
              width: s[i].stroke.width,
              opacity: s[i].stroke.opacity
            })
          ]
        });
      }
      vectorLayers.push(new ol.layer.Vector(vectOpts));
    }
    // by default, maps with vectors zoom to data extent, unless
    // noZoomToExtent set
    options.zoomToExtent = options.noZoomToExtent ? false : true;
  }

  if (options.zoomToExtent) {
  	var toggleVisible = function(tf) {
  		// tf = true or false
      if (tileLayers.length > 0) {
        var t = tileLayers;
        for (i = 0; i < t.length; i++) {
          t[i].setVisible(tf);
        }
      }
  	}
  	toggleVisible(false);
    /**
     * Add event returns extent, so can use this to zoom to feature data extent.
     * Make tile layers visible at this point, so tiles are only fetched after the
     * extent has been established and the appropriate zoom/resolution set.
     */
    var vectorsExtent = ol.extent.createEmpty();
    var sourcesRead = 0;
    for (i = 0; i < vectorLayers.length; i++) {
      vectorLayers[i].on('featureadd', function(e) {
      	 // FIXME hack until https://github.com/openlayers/ol3/issues/1134 fixed
        ol.extent.extend(vectorsExtent, e.extents ? e.extents[0] : e.a[0]);
        sourcesRead++;
        if (sourcesRead == vectorLayers.length) {
          CM.map.getView().fitExtent(vectorsExtent, CM.map.getSize());
          toggleVisible(true);
          document.getElementById('status').style.display = 'none';
        }
      });
    }
  }
  
  var mapOptions = {
    renderer: ol.RendererHint.CANVAS, // currently only canvas handles vectors
    layers: tileLayers.concat(vectorLayers),
    view: views[defaultView]
  };

  // mapOptions.view.on('change:projection', function(evt) {
  //   var proj = evt.target.getProjection().getCode();
  //   CM.map.getLayers().forEach(function(layer) {
  //   console.log(layer);
  //     if (layer.getSource().getProjection().getCode() !== proj) {
  //       layer.setVisible(false);
  //     } else {
  //       layer.setVisible(true);
  //     }
  //   });
  // });

  // create default target div with 400px height and tabindex if not defined in options 
  if (options.target) {
    mapOptions.target = options.target;
  } else {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = "400px";
    document.body.appendChild(mapDiv);
    mapOptions.target = 'map';
  }
    
  // add controls
  if (options.controls) {
    var controls = [];
    if (options.controls.scaleline) {
      controls.push(new ol.control.ScaleLine());
    }
    if (options.controls.latlonmouse) {
      // var mapDiv = document.createElement('div');
      // mapDiv.id = 'mousePositionll';
      // document.body.appendChild(mapDiv);
      controls.push(
        // mousePosition in LatLons
        new ol.control.MousePosition({
          coordinateFormat: function(coordinate) {
            // 4 decimal places for lonlats
            return ol.coordinate.toStringHDMS(coordinate) + ' (' +
                ol.coordinate.toStringXY(coordinate, 4) + ')';
          },
          projection: 'EPSG:4326' //,
          // className: 'mouseP',
          // target: document.getElementById('mousePositionll')
      }));
    }
    if (options.controls.projectedmouse) {
      // var mapDiv = document.createElement('div');
      // mapDiv.id = 'mousePosition';
      // document.body.appendChild(mapDiv);
      controls.push(new ol.control.MousePosition({
        coordinateFormat: function(coordinate) {
          // no decimal places for UTM
          return 'UTM: ' + ol.coordinate.toStringXY(coordinate, 0);
        },
        // set class to override OL default position/style
        className: 'ol-mouse-position projmouse' //,
        // target: document.getElementById('mousePosition')
      }));
    }
    mapOptions.controls = ol.control.defaults().extend(controls);
  }

  CM.map = new ol.Map(mapOptions); // map var only needed for console
  if (!options.zoomToExtent) {
    document.getElementById('status').style.display = 'none';
  }

  CM.layerSwitcher = function(toLayer) {
    var extent = CM.map.getView().calculateExtent(CM.map.getSize());
    var from = CM.map.getView().getProjection();
    var to = views[toLayer].getProjection();
    var transformer = ol.proj.getTransform(from, to);
    var newExtent = ol.extent.transform(extent, transformer);
    CM.map.getLayers().getAt(0).setVisible(false);
    CM.map.setView(views[toLayer]);
    CM.map.getView().fitExtent(newExtent, CM.map.getSize());
    CM.map.getLayers().getAt(1).setVisible(true);
  };
  
  if (!options.noKeyboardPan) {
    CM.map.getViewport().tabIndex=0;
    CM.map.getViewport().focus(); // so can use keyboard pan/zoom
  }
};
