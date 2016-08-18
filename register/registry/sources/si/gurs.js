'use strict';

System.register(['../../../ol.js', '../../projections/3912.js'], function (_export, _context) {
  var ol, proj, extent, resolutions, prefix, mapTypes, sourceOptions, layer;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_projections3912Js) {
      proj = _projections3912Js.default;
    }],
    execute: function () {
      extent = [369832.5829557097, 25060.632245599554, 630781.624406076, 207724.961260856];
      resolutions = [300, 150, 50, 25, 10, 5];
      prefix = 'raster_gurs_pub:SI.GURS.RASTRI.';
      mapTypes = [prefix + 'DPK1000', prefix + 'DPK1000', prefix + 'DPK500', prefix + 'DPK250', prefix + 'DTK50', prefix + 'DTK50'];
      sourceOptions = {
        url: 'http://prostor4.gov.si:80/ows2-m-pub/wms?',
        params: {
          'VERSION': '1.3',
          'LAYERS': mapTypes[0] // initial value; see view resolution below
        },
        attributions: 'Topo maps &copy; <a target="_blank" href="http://e-prostor.gov.si/">Geodetska uprava RS</a>',
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
        id: 'Slovenian Geoportal'
      });

      _export('default', {
        getLayers: function (options) {
          if (options) {
            if (options.zoom) {
              // set layers param initially if zoom set (not default)
              // needed because change:resolution isn't fired on initial set
              layer.getSource().updateParams({ LAYERS: mapTypes[options.zoom] });
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
            var i = resolutions.indexOf(evt.target.getResolution());
            layer.getSource().updateParams({ LAYERS: mapTypes[i] });
          }
        }
      });
    }
  };
});
