// import templates
var tpl = require('components/toolbar.html!text');
var div = document.createElement('div');
div.innerHTML = tpl;

var map = require('olMap').get();
var utils = require('utils');
var $ = utils.$;
document.body.appendChild(div.querySelector('#toolbartemplate').content.cloneNode(true));

// add toggle listener to all toolbartitle divs 
var divs = utils.$$('.toolbartitle');
var cb = function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (var i=0; i<divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

map.getViewport().appendChild(div.querySelector('#toggletemplate').content.cloneNode(true));
// toolbar slideout 
var slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar')
});
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
});

$('#addlayer').addEventListener('click', function() {
  System.import('components/addlayer');
});
$('#addgoto').addEventListener('click', function() {
  System.import('components/center');
});
$('#adddraw').addEventListener('click', function() {
  System.import('components/draw');
});
$('#addmapDef').addEventListener('click', function() {
  System.import('components/mapdef');
});
module.exports = $('#toolbar');
