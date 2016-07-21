/**
 * Common code for all projections: exports addProjection() which sets the def
 * on proj4 and then sets the transforms on ol.proj
 */

var ol = require('../../ol.js');
var proj4 = require('https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js');

// FIXME 3857 should be optional
var projections = ['EPSG:4326', 'EPSG:3857'];

function addProjection(projCode, projDef) {
  if (projections.indexOf(projCode) === -1) {
    // add the projection to Proj4 defs
    proj4.defs(projCode, projDef);

    // add the projection object to ol.proj
    ol.proj.addProjection(new ol.proj.Projection({
      code: projCode,
      units: 'm' // could be taken from proj4.defs
    }));

    projections.forEach(function(code) {
      // get transform functions from Proj4
      var proj4Transform = proj4(code, projCode);
      // ... and add to ol.proj
      ol.proj.addCoordinateTransforms(code, projCode,
          proj4Transform.forward, proj4Transform.inverse);
    });
    projections.push(projCode);
  }
}

module.exports = {
  addProjection: addProjection
};
