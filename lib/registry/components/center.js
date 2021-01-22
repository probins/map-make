/**
 * Allows users to enter a lat/lon coordinate which will then become the map center
 */

import tpl from './center.htm.js';
import Component from './component.js';
import { $ } from '../../utils.js';
// make sure toolbar initialised
import './toolbar.js';
import { transform } from '../../deps.js';
import olMap from '../../olMap.js';

const component = new Component(tpl, 'center');
// add centertemplate to toolbar
$('#components-content').appendChild(component.getTemplate('center'));

const map = olMap.get();

$('#setLatLon').addEventListener('click', () => {
  let coord = [parseFloat($('#lon').value),
      parseFloat($('#lat').value)];
  const view = map.get('view');
  coord = transform(coord, 'EPSG:4326', view.getProjection());
  const extent = view.extent;
  // copied from ol.extent.containsCoordinate
  if (!(extent[0] <= coord[0] && coord[0] <= extent[2] && extent[1] <= coord[1] && coord[1] <= extent[3])) {
    alert('Coordinate outside map extent'); //FIXME English
  } else {
    view.setCenter(coord);
    view.setZoom(view.zoomIn);
  }
});
