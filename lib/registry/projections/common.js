/**
 * Common code for all projections: exports addProjection() which sets the def
 * on proj4 and then sets the transforms on ol.proj
 */

import ol from '../../ext/ol.js';
import proj4 from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/index.js';

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

export default {
  addProjection: addProjection
};
