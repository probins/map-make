function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }

var errors = {
  error: function(err, msg) {
    console.log(err);
    alert(msg);
    return;
  },

  // FIXME English
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
  },
  widgets: function(err) {
    errors.error(err, 'Unable to load widget module(s)');
    return;
  }
};


module.exports = {
  $: $,
  $$: $$,

  errors: errors
};
