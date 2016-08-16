'use strict';

System.register(['./common.js'], function (_export, _context) {
  var common, projCode, projDef;
  return {
    setters: [function (_commonJs) {
      common = _commonJs.default;
    }],
    execute: function () {
      projCode = 'EPSG:21781';
      projDef = '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs';

      common.addProjection(projCode, projDef);

      _export('default', {
        projCode: projCode
      });
    }
  };
});
