'use strict';

System.register(['./toolbar.htm.js', './component.js', '../../ol.js', '../../olMap.js', '../../utils.js', '../../mapDef.js'], function (_export, _context) {
  var tpl, Component, ol, olMap, utils, md, toolbar, map, $, mapDef, i, template, divs, cb, listener, btns, comp, slideout;
  return {
    setters: [function (_toolbarHtmJs) {
      tpl = _toolbarHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_mapDefJs) {
      md = _mapDefJs.default;
    }],
    execute: function () {
      toolbar = new Component(tpl);
      map = olMap.get();
      $ = utils.$;
      mapDef = md.get();
      template = toolbar.getTemplate('toolbar');
      divs = template.querySelectorAll('.toolbartitle');

      cb = function () {
        // toggle display of next, i.e. content, element
        var el = this.nextElementSibling;
        el.style.display = el.style.display == 'block' ? 'none' : 'block';
      };

      for (i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', cb);
      }

      // set click listeners on toolbar buttons

      listener = function () {
        // component name is button id minus 'button'
        var me = this.getAttribute('id').replace('button', '');
        System.importModule('registry/components/' + me + '.js');
        // hide button and remove listener
        this.style.display = 'none';
        this.removeEventListener('click', listener);
      };

      btns = template.querySelectorAll('.addbutton');

      for (i = 0; i < btns.length; i++) {
        comp = btns[i].getAttribute('id').replace('button', '');

        if (!(mapDef.components && mapDef.components[comp])) {
          // add listener if component not already added
          btns[i].addEventListener('click', listener);
        }
      }

      // if no vectors, hide popup/tooltip
      if (!mapDef.vectors) {
        btns = template.querySelectorAll('.vectorOption');
        for (i = 0; i < btns.length; i++) {
          btns[i].style.display = 'none';
        }
      }

      // add toggle listener to all helptitle divs
      divs = template.querySelectorAll('.helptitle');
      cb = function () {
        // toggle display of next, i.e. content, element
        var el = this.nextElementSibling;
        el.style.display = el.style.display == 'block' ? 'none' : 'block';
      };
      for (i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', cb);
      }

      document.body.appendChild(template);

      // add listener to component add dropdown
      $('#addcomponent').onchange = function (e) {
        if (e.target.value !== 'choose') {
          if (e.target.value == 'redraw') {
            // 'draw' set to 'redraw' when hidden
            $('#drawtype').style.display = 'block';
            $('#drawoption').style.display = 'none';
          } else {
            System.importModule('registry/components/' + e.target.value + '.js');
            $('#' + e.target.value + 'option').style.display = 'none';
          }
          this.value = 'choose';
          this.blur();
        }
      };

      // add toggle button to map
      // use ol.control to prevent event propagation
      map.addControl(new ol.control.Control({ element: toolbar.getTemplate('toggle') }));
      // create toolbar slideout
      slideout = new Slideout({
        'panel': $('#map'),
        'menu': $('#toolbar'),
        'touch': false
      });

      $('#slide-toggle').addEventListener('click', function () {
        slideout.toggle();
      });

      _export('default', $('#toolbar'));
    }
  };
});
