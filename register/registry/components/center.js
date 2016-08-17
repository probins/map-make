'use strict';

System.register(['./center.htm.js', './component.js', '../../utils.js', './toolbar.js', '../../ol.js', '../../olMap.js'], function (_export, _context) {
  var tpl, Component, utils, ol, olMap, component, $, map;
  return {
    setters: [function (_centerHtmJs) {
      tpl = _centerHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_toolbarJs) {}, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'center');
      $ = utils.$;


      // add centertemplate to toolbar
      $('#components-content').appendChild(component.getTemplate('center'));

      map = olMap.get();

      $('#setLatLon').addEventListener('click', function () {
        var coord = [parseFloat($('#lon').value), parseFloat($('#lat').value)];
        coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
        if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
          alert('Coordinate outside map extent'); //FIXME English
        } else {
            map.getView().setCenter(coord);
            map.getView().setZoom(map.getView().zoomIn);
          }
      });
    }
  };
});
