'use strict';

System.register(['../../../../ol.js', '../../../projections/3763.js'], function (_export, _context) {
  var ol, proj, extent, resolutions, layerNames, baseUrl, sourceOptions, layer;


  function setUrl(zoom) {
    layer.getSource().updateParams({ LAYERS: layerNames[zoom] });
    layer.getSource().setUrl(baseUrl + layerNames[zoom] + '?');
  }

  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections3763Js) {
      proj = _projections3763Js.default;
    }],
    execute: function () {
      extent = [-170000, -325000, 180000, 290000];
      resolutions = [1191.40625, 595.703125, 297.8515625, 148.92578125, 74.462890625, 37.2314453125];
      layerNames = ['sc2500k', 'sc2500k', 'sc1500k', 'sc1500k', 'sc1500k', 'sc500k', 'sc200k', 'sc200k', 'sc100k', 'sc100k', 'sc50k', 'sc50k'];
      baseUrl = 'http://mapas.dgterritorio.pt/wms/';
      sourceOptions = {
        url: baseUrl + layerNames[0] + '?',
        params: {
          'LAYERS': layerNames[0] // initial value; see view resolution below
        },
        attributions: 'Topo maps &copy; <a target="_blank" href="http://mapas.dgterritorio.pt/">DGT</a>',
        extent: extent,
        projection: proj.projCode,
        // needs tilegrid otherwise uses inappropriate global grid
        tileGrid: new ol.tilegrid.TileGrid({
          extent: extent,
          resolutions: resolutions
        })
      };
      layer = new ol.layer.Tile({
        source: new ol.source.TileWMS(sourceOptions),
        id: 'DGT (PT)'
      });

      _export('default', {
        getLayers: function (options) {
          if (options) {
            if (options.zoom) {
              // set layers param initially if zoom set (not default)
              // needed because change:resolution isn't fired on initial set
              setUrl(options.zoom);
            }
          }
          return [layer];
        },
        extent: extent,
        projCode: proj.projCode,
        resolutions: resolutions,
        // listener fired whenever view resolution changes
        viewEvent: {
          type: 'change:resolution',
          func: function (evt) {
            // LAYERS param on source has to be set based on resolution
            setUrl(resolutions.indexOf(evt.target.getResolution()));
          }
        }
      });
    }
  };
});
