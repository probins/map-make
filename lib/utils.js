/**
 * Exports $() (querySelector), $$() (querySelectorAll), and error handling routines.
 */

function $(s) {
  return document.querySelector(s);
}
function $$(s) {
  return document.querySelectorAll(s);
}

var errors = {
  error: function(err, msg) {
    console.log(err);
    System.error = true;
    $('#status').innerHTML = msg;
    return;
  },

  // FIXME English
  components: function(err) {
    errors.error(err, 'Unable to load component module(s)');
    return;
  },
  fetchFail: function(err) {
    errors.error(err, 'File fetch failed');
    return;
  },
  noMapDef: function(err) {
    errors.error(err, 'Unable to load mapDef');
    return;
  },
  rasters: function(err) {
    errors.error(err, 'Unable to load raster module(s)');
    return;
  },
  vectors: function(err) {
    errors.error(err, 'Unable to load style module(s)');
    return;
  }
};


export default {
  $: $,
  $$: $$,

  errors: errors
};
