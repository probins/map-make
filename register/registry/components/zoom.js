'use strict';

System.register(['./zoom.htm.js', './component.js', '../../ol.js', '../../olMap.js'], function (_export, _context) {
  var tpl, Component, ol, olMap, component, map, template, level;
  return {
    setters: [function (_zoomHtmJs) {
      tpl = _zoomHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }],
    execute: function () {
      component = new Component(tpl);
      map = olMap.get();
      template = component.getTemplate('zoom');
      level = template.querySelector('#zoomLevel');

      // use ol.control to prevent event propagation
      map.addControl(new ol.control.Control({ element: template }));

      level.addEventListener('change', function () {
        map.getView().setZoom(level.value);
        this.blur();
      });

      _export('default', {
        setZooms: function () {
          for (var i = 0; i < map.getView().zoomLevels; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = i;
            level.appendChild(option);
          }
          level.value = map.getView().getZoom();
          map.getView().on('change:resolution', function (e) {
            level.value = map.getView().getZoom();
          });
        }
      });
    }
  };
});
