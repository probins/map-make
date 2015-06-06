  var tpl = require('components/center.html!text');
  var div = document.createElement('div');
  div.innerHTML = tpl;
  var utils = require('utils');
  var $ = utils.$;
  $('#addgoto').style.display = 'none';
  // make sure toolbar initialised
  require('components/toolbar');

  // add centertemplate to toolbar
  $('#widgets-content').appendChild(div.querySelector('#centertemplate').content.cloneNode(true));

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
