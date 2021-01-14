/**
 * Common code for all projections: exports addProjection() which sets the def
 * on proj4 and then sets the transforms on proj
 */

import { addProjection as addOLProjection, addCoordinateTransforms, Projection } from '../../deps.js';
import proj4 from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/bareindex.js';

var projections = ['EPSG:4326'];

function addProjection(projCode, projDef) {
  if (projections.indexOf(projCode) === -1) {
    // add the projection to Proj4 defs
    proj4.defs(projCode, projDef);

    // add the projection object to proj
    if (projCode !== 'EPSG:3857') { // 3857 already in ol
      addOLProjection(new Projection({
        code: projCode,
        units: projDef.units
      }));
    }

    projections.forEach(function(code) {
      // get transform functions from Proj4 and add to ol
      if (code == 'EPSG:4326' && projCode == 'EPSG:3857') {
        // already in ol
      } else {
        var proj4Transform = proj4(code, projCode);
        // ... and add to proj
        addCoordinateTransforms(code, projCode,
            proj4Transform.forward, proj4Transform.inverse);
      }
    });
    projections.push(projCode);
  }
}

export default {
  addProjection: addProjection
};
