'use strict';

System.register(['./common.js'], function (_export, _context) {
  var common, projCode, projDef;
  return {
    setters: [function (_commonJs) {
      common = _commonJs.default;
    }],
    execute: function () {
      projCode = 'EPSG:3812';
      projDef = '+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 +lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +units=m +no_defs';

      common.addProjection(projCode, projDef);

      _export('default', {
        projCode: projCode
      });
    }
  };
});
