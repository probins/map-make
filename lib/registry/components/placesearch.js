/**
 * component to search geo names on geonames.org and zoom to selected item.
 * uses fetch
 * requires API key, and optionally continent restriction
 */

import tpl from './placesearch.htm.js';
import Component from './component.js';
import { $, errors } from '../../utils.js';
// make sure toolbar initialised
import './toolbar.js';
import { transform } from '../../deps.js';
import olMap from '../../olMap.js';

const component = new Component(tpl, 'placesearch');
// add template to toolbar
$('#components-content').appendChild(component.getTemplate('placesearch'));

const map = olMap.get();

$('#placesearchbutton').addEventListener('click', function() {
  const place = document.getElementById('searchfor').value;
  const api = document.getElementById('placesearchapi').value;
  const continent = document.getElementById('placesearchcontinent').value;
  let url = 'https://secure.geonames.org/searchJSON?maxRows=10&username=' + api + '&isNameRequired=true&style=full&q=' + place;
  if (continent) {
    url += '&continentCode=' + continent;
  }
  url = url.replace(/amp;/g,'');

  function goto(lng, lat) {
    let coord = [lng, lat];
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
  };
  function eachGoto(e) {
    goto(parseFloat(this.dataset.lng), parseFloat(this.dataset.lat));
    e.preventDefault();
  };
  function placesearchcallback(feed) {
    if (feed === null) {
      alert('Nothing returned from geonames.org');
      return;
    }
    const geonames = feed.geonames;
    if (geonames.length === 0) {
      alert('No such place on geonames.org');
      return;
    }
    let lat, lng;
    if (geonames.length == 1) {
      lat = parseFloat(geonames[0].lat);
      lng = parseFloat(geonames[0].lng);
      goto(lng, lat);
    } else {
      let html = '';
      for (let i = 0; i < geonames.length; i++) {
        let geoname = geonames[i];
        lat = geoname.lat;
        lng = geoname.lng;
        let fullName = geoname.name + ', ' + geoname.adminName1 + ', ' + geoname.adminName2
            + ', ' + geoname.adminName3 + ', ' + geoname.adminName4;
        html += '<a href="#" class="gotos" data-lat="' + lat + '" data-lng="' + lng + '">'
            + fullName + '</a><br />';
      }
      document.getElementById('searchResults').innerHTML = html;
      let gotos = document.querySelectorAll('.gotos');
      for (let j = 0; j < gotos.length; j++) {
        gotos[j].addEventListener('click', eachGoto);
      }
    }
  };

  fetch(url)
  .then(response => response.json())
  .then(result => placesearchcallback(result))
  .catch(() => errors.fetchFail());
});
