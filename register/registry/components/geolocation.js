'use strict';

System.register(['./geolocation.htm', './component.js', '../../ol.js', '../../olMap.js', '../../utils.js', './toolbar.js'], function (_export, _context) {
  var tpl, Component, ol, olMap, utils, component, map, template, $, msgs, markerEl, marker;
  return {
    setters: [function (_geolocationHtm) {
      tpl = _geolocationHtm.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_toolbarJs) {}],
    execute: function () {
      component = new Component(tpl, 'geolocation');
      map = olMap.get();
      template = component.getTemplate('geolocation');

      // use ol.control to prevent event propagation
      map.addControl(new ol.control.Control({ element: template }));

      $ = utils.$;
      msgs = {
        ERROR: 'Unable to retrieve your location',
        OUTSIDE: 'Position outside map extent',
        UNSUPPORTED: 'Geolocation is not supported by your browser'
      };


      template = component.getTemplate('geomarker');
      markerEl = template.getElementById('geomarker');
      marker = new ol.Overlay({
        positioning: 'center-center',
        element: markerEl
      });

      map.addOverlay(marker);

      $('#geolocationbutton').addEventListener('click', function () {
        if (!navigator.geolocation) {
          alert(msgs.UNSUPPORTED);
          return;
        }
        function success(position) {
          var coord = [parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)];
          coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
          if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
            alert(msgs.OUTSIDE);
          } else {
            map.getView().setCenter(coord);
            map.getView().setZoom(map.getView().zoomIn);
            var rotation = position.heading ? position.heading - 45 : -45;
            markerEl.firstChild.style.transform = 'rotate(' + rotation + 'deg)';
            marker.setPosition(coord);
          }
        }
        function error() {
          alert(msgs.ERROR);
        }
        navigator.geolocation.getCurrentPosition(success, error);
      });

      // add helptemplate to toolbar
      // make sure toolbar initialised

      $('#help-content').appendChild(component.getTemplate('geolocationhelp'));
      // add toggle listener to helptitle div
      $('#geolocation-title').addEventListener('click', function () {
        // toggle display of next, i.e. content, element
        var el = this.nextElementSibling;
        el.style.display = el.style.display == 'block' ? 'none' : 'block';
      });
    }
  };
});
