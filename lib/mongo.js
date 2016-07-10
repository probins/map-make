/**
 * Handles read/write for flat GeoJSON files like those from MongoDB.
 * Considered creating a custom OL format inheriting from GeoJSON, but
 * loadingstrategy needs non-exported values, and generally more trouble than worth.
 */

var ol = require('ol.js');

module.exports = {
  /**
   * params: input: array of Mongo documents (or stringified version);
   *         opts: like ol.Format with FeatureProjection
   * returns: array of ol features
   */
  readFeatures: function(input, opts) {
    if (typeof input === 'string') {
      input = JSON.parse(input);
    }
    var features = [];
    input.forEach(function(r) {
      var feature = new ol.Feature();
      for (var key in r) {
        if (key == 'id') {
          feature.setId(r[key]);
        // geometry not necessarily called 'geometry' but has type/coordinates
        } else if (r[key] && r[key].type && r[key].coordinates) {
          var geom = new ol.geom[r[key].type](r[key].coordinates);
          if (opts && opts.featureProjection) {
            geom.transform('EPSG:4326', opts.featureProjection);
          }
          feature.setGeometry(geom);
        } else {
          feature.set(key, r[key]);
        }
      }
      features.push(feature);
    });
    return features;
  },

  /**
   * uses GeoJSON to output features, and then rearranges so properties top-level
   * params: input: array of ol features; opts: like ol.Format with FeatureProjection
   * returns: stringified array of Mongo documents (always in 4326)
   */
  writeFeatures: function(input, opts) {
    var out = [];
    var geojson = new ol.format.GeoJSON();
    var features = JSON.parse(geojson.writeFeatures(input, opts)).features;
    features.forEach(function(f) {
      var feature = {
        id: f.id,
        geometry: f.geometry
      };
      for (var key in f.properties) {
        feature[key] = f.properties[key];
      }
      out.push(feature);
    });
    return JSON.stringify(out);
  }
};
