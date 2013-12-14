"es6-transpile";
define(
  [],
  function() {
    "use strict";
    var registry = '~/registry/',
        sourceDir = registry + 'sources/',
        styleDir = registry + 'styles/',
        htmlDir = '~/html/',
        errors = {
          noRaster: 'Raster or style does not exist',
          noMapdef: 'mapDef does not exist'
        };
    var config = {
      olMap: '~/olMap',
      projWrapper: '~/plugins/projWrapper',
      proj: 'cdnjs:proj4js/1.1.0/proj4js-compressed.js!projWrapper'
    };
    jspm.config({map: config});
    window.Proj4js = {};
    var mapDef,
        i,
        qsOptions,
        md;
    if (window.location.search) {
      qsOptions = parseQueryString();
      if (qsOptions.mapDef) {
        mapDef = qsOptions.mapDef;
      }
    } else {
      md = document.getElementById('mapDef');
      if (md) {
        mapDef = md.innerHTML;
      }
      if (!mapDef) {
        jspm.import (htmlDir + 'initialForm.html!text', displayForm);
      }
    }
    var imports = ['olMap'];
    if (mapDef) {
      imports.push(mapDef + '!json');
    }
    jspm.import (imports, function(olMap) {
      var options = arguments[1] || qsOptions || {projCode: 'EPSG:4326'};
      var imports = [],
          styles = [],
          modName,
          key;
      if (options.rasters) {
        for (i = 0; i < options.rasters.length; i++) {
          if (typeof options.rasters[i] === 'object') {
            for (key in options.rasters[i]) {
              modName = key;
            }
          } else {
            modName = options.rasters[i];
          }
          config[modName] = sourceDir + modName;
          imports.push(modName);
        }
      }
      if (options.vectors) {
        for (i = 0; i < options.vectors.length; i++) {
          if (options.vectors[i].styles) {
            for (var j = 0; j < options.vectors[i].styles.length; j++) {
              var style = options.vectors[i].styles[j];
              styles.push(style);
              imports.push(styleDir + style + '.json!json');
            }
          }
        }
      }
      jspm.config({map: config});
      jspm.import (imports, function() {
        var i;
        olMap.createMap(options.target, options.noKeyboardPan);
        if (options.rasters) {
          var rasters = {},
              rasterDef,
              key;
          for (i = 0; i < options.rasters.length; i++) {
            if (typeof options.rasters[i] === 'object') {
              for (key in options.rasters[i]) {
                rasterDef = key;
              }
            } else {
              rasterDef = options.rasters[i];
            }
            rasters[rasterDef] = arguments[i];
          }
          olMap.createRasters(rasters, options);
        } else {
          olMap.create4326View();
        }
        if (options.vectors) {
          var styleDefs = {};
          if (styles) {
            for (i = options.rasters.length; i < arguments.length; i++) {
              styleDefs[styles[i - options.rasters.length]] = arguments[i];
            }
          }
          for (i = 0; i < options.vectors.length; i++) {
            if (options.vectors[i].styles) {
              options.vectors[i].styles[0] = styleDefs[options.vectors[i].styles[0]];
            }
          }
          olMap.createVectors(options.vectors);
          if (options.center || options.zoom) {
            if (options.rasters) {
              olMap.make1stLayerVisible();
            }
          } else {
            olMap.addFeaturesListener();
          }
          if (!options.rasters) {
            olMap.setDefaultView('EPSG:4326');
          }
        }
        if (options.widgets) {
          olMap.addWidgets(options.widgets);
        }
        if (options.center || options.zoom) {
          var status = document.getElementById('status');
          if (status) {
            status.style.display = 'none';
          }
        }
        if (!options.noKeyboardPan) {
          olMap.setFocus();
        }
        document.body.appendChild(olMap.getLayersDiv());
      }, function() {
        alert(errors.noRaster);
      });
    }, function() {
      alert(errors.noMapdef);
    });
    function parseQueryString() {
      var qsOptions = {},
          pair,
          widgets,
          i,
          j;
      var qs = window.location.search.substring(1).split('&');
      for (i = 0; i < qs.length; i++) {
        pair = qs[i].split('=');
        switch (pair[0]) {
          case 'mapDef':
            return {mapDef: pair[1]};
          case 'rasters':
            qsOptions.rasters = pair[1].split(',');
            break;
          case 'lat':
            qsOptions.lat = parseFloat(pair[1]);
            break;
          case 'lon':
            qsOptions.lon = parseFloat(pair[1]);
            break;
          case 'zoom':
            qsOptions.zoom = parseFloat(pair[1]);
            break;
          case 'widgets':
            qsOptions.widgets = {};
            widgets = pair[1].split(',');
            for (j = 0; j < widgets.length; j++) {
              qsOptions.widgets[widgets[j]] = true;
            }
            break;
        }
      }
      if (qsOptions.lat && qsOptions.lon) {
        qsOptions.center = {
          lat: qsOptions.lat,
          lon: qsOptions.lon
        };
      }
      return qsOptions;
    }
    function displayForm(html) {
      var status = document.getElementById('status');
      status.style.top = '5%';
      status.style.left = '5%';
      status.innerHTML = html;
      document.getElementById('mapDef').addEventListener('change', function() {
        window.location.search = 'mapDef=' + this.value;
      });
      document.getElementById('mapDefForm').addEventListener('click', processForm);
    }
    function processForm() {
      var qs = 'rasters=' + document.options.rasters.value;
      if (document.options.lat.value !== '') {
        qs += '&lat=' + document.options.lat.value;
      }
      if (document.options.lon.value !== '') {
        qs += '&lon=' + document.options.lon.value;
      }
      if (document.options.zoom.value !== '') {
        qs += '&zoom=' + document.options.zoom.value;
      }
      var op = [],
          widgets = document.options.widgets;
      for (i = 0; i < widgets.length; i++) {
        if (widgets[i].checked === true) {
          op.push(widgets[i].value);
        }
      }
      if (op.length > 0) {
        qs += '&widgets=' + op.join();
      }
      window.location.search = qs;
    }
  });