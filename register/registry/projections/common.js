'use strict';

System.register(['../../ol.js', './proj4.js'], function (_export, _context) {
  var ol, proj4, projections;


  function addProjection(projCode, projDef) {
    if (projections.indexOf(projCode) === -1) {
      // add the projection to Proj4 defs
      proj4.defs(projCode, projDef);

      // add the projection object to ol.proj
      ol.proj.addProjection(new ol.proj.Projection({
        code: projCode,
        units: 'm' // could be taken from proj4.defs
      }));

      projections.forEach(function (code) {
        // get transform functions from Proj4
        var proj4Transform = proj4(code, projCode);
        // ... and add to ol.proj
        ol.proj.addCoordinateTransforms(code, projCode, proj4Transform.forward, proj4Transform.inverse);
      });
      projections.push(projCode);
    }
  }

  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_proj4Js) {
      proj4 = _proj4Js.default;
    }],
    execute: function () {
      projections = ['EPSG:4326', 'EPSG:3857'];

      _export('default', {
        addProjection: addProjection
      });
    }
  };
});
