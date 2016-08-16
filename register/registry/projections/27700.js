'use strict';

System.register(['./common.js'], function (_export, _context) {
  var common, projCode, projDef;
  return {
    setters: [function (_commonJs) {
      common = _commonJs.default;
    }],
    execute: function () {
      projCode = 'EPSG:27700';
      projDef = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717' + ' +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs';

      common.addProjection(projCode, projDef);

      _export('default', {
        projCode: projCode
      });
    }
  };
});
