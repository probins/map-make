'use strict';

System.register(['./tooltip.htm.js', './component.js', '../../utils.js', '../../ol.js', '../../olMap.js', '../../vectors.js', '../../measure.js'], function (_export, _context) {
  var tpl, Component, utils, ol, olMap, vectors, measure, component, $, map, select;
  return {
    setters: [function (_tooltipHtmJs) {
      tpl = _tooltipHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_vectorsJs) {
      vectors = _vectorsJs.default;
    }, function (_measureJs) {
      measure = _measureJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'tooltip');
      $ = utils.$;
      map = olMap.get();

      map.getViewport().appendChild(component.getTemplate('tooltip'));
      select = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove,
        layers: vectors.getLayers().getArray()
      });


      map.addInteraction(select);

      select.on('select', function (e) {
        var html, pixel;
        var tooltip = $('#tooltip');
        if (e.selected.length > 0) {
          var feature = e.selected[0];
          pixel = e.mapBrowserEvent.pixel;
          html = feature.getProperties().name || feature.getProperties().title || '';
          var geom = feature.getGeometry();
          if (geom.getLength) {
            // get length for linestrings
            var lenHav = measure.getLength(geom, map.getView().getProjection());
            html += ' ' + Math.round(lenHav * 0.1) / 100 + 'km';
          }
        }
        if (html) {
          tooltip.innerHTML = html;
          tooltip.style.left = pixel[0] + 10 + 'px';
          tooltip.style.top = pixel[1] + 10 + 'px';
          tooltip.style.display = 'block';
          // change cursor to indicate to users that they can click on this point
          map.getTarget().style.cursor = 'pointer';
        } else {
          tooltip.style.display = 'none';
          map.getTarget().style.cursor = '';
        }
      });
    }
  };
});
