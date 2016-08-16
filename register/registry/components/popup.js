'use strict';

System.register(['./popup.htm', './component.js', '../../olMap.js', '../../ol.js'], function (_export, _context) {
  var tpl, Component, olMap, ol, component, map, temp, overlay;
  return {
    setters: [function (_popupHtm) {
      tpl = _popupHtm.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }],
    execute: function () {
      component = new Component(tpl);
      map = olMap.get();
      temp = component.getTemplate('popup');

      document.body.appendChild(temp.querySelector('style'));

      overlay = new ol.Overlay({
        element: temp.querySelector('div'),
        positioning: 'bottom-center',
        offset: [0, -15],
        stopEvent: true
      });

      map.addOverlay(overlay);

      _export('default', {
        getOverlay: function () {
          return overlay;
        }
      });
    }
  };
});
