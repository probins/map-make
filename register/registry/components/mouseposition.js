'use strict';

System.register(['./mouseposition.htm.js', './component.js', '../../ol.js', '../../olMap.js'], function (_export, _context) {
  var tpl, Component, ol, olMap, component, template, map;
  return {
    setters: [function (_mousepositionHtmJs) {
      tpl = _mousepositionHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'mouseposition');
      template = component.getTemplate('mouseposition');

      // only style, so can be added to head
      document.head.appendChild(template);

      map = olMap.get();


      // mousePosition in LatLons
      map.addControl(new ol.control.MousePosition({
        coordinateFormat: function (coordinate) {
          // 4 decimal places for latlons
          return ol.coordinate.toStringHDMS(coordinate) + ' (' + ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
        },
        projection: 'EPSG:4326'
      }));

      // ... and in projected coords
      map.addControl(new ol.control.MousePosition({
        coordinateFormat: function (coordinate) {
          // no decimal places for projected coords
          return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
        },
        // set class to override OL default position/style
        className: 'ol-mouse-position projmouse'
      }));
    }
  };
});
