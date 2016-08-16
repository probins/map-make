'use strict';

System.register(['./ol.js', './olMap.js', './vectors.js'], function (_export, _context) {
  var ol, olMap, vectors, map, select, evtKey, displayCallback, drawActive;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_vectorsJs) {
      vectors = _vectorsJs.default;
    }],
    execute: function () {
      map = olMap.get();
      select = new ol.interaction.Select({
        layers: vectors.getLayers().getArray()
      });

      map.addInteraction(select);

      drawActive = false;

      _export('default', {
        get: function () {
          return select;
        },
        // display and draw select callbacks should not be active at same time
        displayOn: function (callback) {
          displayCallback = callback;
          if (!drawActive) {
            evtKey = select.on('select', displayCallback);
          }
        },
        drawOn: function () {
          if (evtKey) {
            ol.Observable.unByKey(evtKey);
          }
          drawActive = true;
        },
        drawOff: function () {
          if (displayCallback) {
            evtKey = select.on('select', displayCallback);
          }
          drawActive = false;
        }
      });
    }
  };
});
