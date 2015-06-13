  var tpl = require('components/center.html');
  var Component = require('components/component');
  var component = new Component(tpl);

  var utils = require('utils');
  var $ = utils.$;
  // make sure toolbar initialised
  require('components/toolbar');

  // add centertemplate to toolbar
  $('#widgets-content').appendChild(component.getTemplate('center'));

  var ol = require('ol');
  var map = require('olMap').get();
  $('#setLatLon').addEventListener('click', function() {
    var coord = [parseFloat($('#lon').value),
        parseFloat($('#lat').value)];
    coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
    if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
      alert('Coordinate outside map extent'); //FIXME English
    } else {
      map.getView().setCenter(coord);
    }
  });
