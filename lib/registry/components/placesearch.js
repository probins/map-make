/**
 * component to search geo names on geonames.org and zoom to selected item.
 * uses fetch
 * requires API key, and optionally continent restriction
 */

import tpl from './placesearch.htm.js';
import Component from './component.js';
const component = new Component(tpl, 'placesearch');

import { $, errors } from '../../utils.js';
// make sure toolbar initialised
import './toolbar.js';

// add template to toolbar
$('#components-content').appendChild(component.getTemplate('placesearch'));

import { transform } from '../../deps.js';
import olMap from '../../olMap.js';
let map = olMap.get();
$('#placesearchbutton').addEventListener('click', () => {
  let place = document.getElementById('searchfor').value;
  let api = document.getElementById('placesearchapi').value;
  let continent = document.getElementById('placesearchcontinent').value;
  let url = 'https://secure.geonames.org/searchJSON?maxRows=10&username=' + api + '&isNameRequired=true&style=full&q=' + place;
  if (continent) {
    url += '&continentCode=' + continent;
  }
  url = url.replace(/amp;/g,'');

  let goto = function(lng, lat) {
    let coord = [lng, lat];
    coord = transform(coord, 'EPSG:4326', map.get('view').getProjection());
    let extent = map.get('view').extent;
    // copied from ol.extent.containsCoordinate
    if (!(extent[0] <= coord[0] && coord[0] <= extent[2] && extent[1] <= coord[1] && coord[1] <= extent[3])) {
      alert('Coordinate outside map extent'); //FIXME English
    } else {
      map.get('view').setCenter(coord);
      map.get('view').setZoom(map.get('view').zoomIn);
    }
  };
  let eachGoto = function(e) {
    goto(parseFloat(this.dataset.lng), parseFloat(this.dataset.lat));
    e.preventDefault();
  };
  let placesearchcallback = function(feed) {
    if (feed === null) {
      alert('Nothing returned from geonames.org');
      return;
    }
    let geonames = feed.geonames;
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
