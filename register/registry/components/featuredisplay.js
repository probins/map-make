'use strict';

System.register(['./featuredisplay.htm.js', './component.js', '../../olMap.js', '../../select.js', '../../measure.js', './popup.js'], function (_export, _context) {
  var tpl, Component, olMap, select, measure, popup, component, featureTemplate, map, overlay;
  return {
    setters: [function (_featuredisplayHtmJs) {
      tpl = _featuredisplayHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_selectJs) {
      select = _selectJs.default;
    }, function (_measureJs) {
      measure = _measureJs.default;
    }, function (_popupJs) {
      popup = _popupJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'featuredisplay');
      featureTemplate = component.getTemplate('featuredisplay');
      map = olMap.get();
      overlay = popup.getOverlay();


      select.displayOn(function (e) {
        // click on feature displays attributes in overlay
        // uses overlay as closure
        var el = overlay.getElement();
        if (e.selected.length > 0) {
          var feature = e.selected[0];
          var featureDisplay = featureTemplate.querySelector('.featureDisplay').cloneNode(true);
          featureDisplay.querySelector('.featureId').innerHTML = feature.getId();
          var atts = feature.getProperties();
          for (var att in atts) {
            // ignore attributes called geometry or having mongo objectid
            if (atts[att] && !atts[att]['$oid'] && att != 'geometry') {
              // if mongo $date convert to Date
              var val = atts[att]['$date'] ? new Date(atts[att]['$date']) : atts[att];
              var attNode = featureTemplate.querySelector('.featureAtt').cloneNode(true);
              attNode.innerHTML = att + ': ' + val;
              featureDisplay.querySelector('.featureAtts').appendChild(attNode);
            }
          }
          var geom = feature.getGeometry();
          if (geom.getLength) {
            // get length for linestrings
            var lenHav = measure.getLength(geom, map.getView().getProjection());
            featureDisplay.querySelector('.featureLenHav').innerHTML = Math.round(lenHav * 0.1) / 100;
          } else {
            featureDisplay.querySelector('.featureHav').style.display = 'none';
          }

          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
          el.appendChild(featureDisplay);
          el.style.display = 'block';
          overlay.setPosition(e.mapBrowserEvent.coordinate);
        } else {
          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
          el.style.display = 'none';
        }
      });
    }
  };
});
