'use strict';

System.register(['./common.js'], function (_export, _context) {
  var common, projCode, projDef;
  return {
    setters: [function (_commonJs) {
      common = _commonJs.default;
    }],
    execute: function () {
      projCode = 'EPSG:3035';
      projDef = '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs';

      common.addProjection(projCode, projDef);

      _export('default', {
        projCode: projCode
      });
    }
  };
});
