var utils = require('utils');
var $ = utils.$;
document.body.appendChild(utils.importTemplate('toolbar'));

// add toggle listener to all toolbartitle divs 
var divs = utils.$$('.toolbartitle');
for (var i=0; i<divs.length; i++) {
  divs[i].addEventListener('click', function() {
    // toggle display of next, i.e. content, element
    var el = this.nextElementSibling;
    el.style.display = (el.style.display == 'block') ? 'none' : 'block';
  });
}

// toolbar slideout 
var slideout = new Slideout({
  'panel': document.getElementById('map'),
  'menu': document.getElementById('toolbar')
});
$('.toggle-button').addEventListener('click', function() {
  slideout.toggle();
});

$('#addlayer').addEventListener('click', function() {
  utils.importComponent('addlayer');
});
$('#addgoto').addEventListener('click', function() {
  utils.importComponent('center');
});
$('#adddraw').addEventListener('click', function() {
  utils.importComponent('draw');
});
$('#addmapDef').addEventListener('click', function() {
  utils.importComponent('mapdef');
});
module.exports = $('#toolbar');
