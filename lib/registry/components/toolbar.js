var utils = require('utils');
var $ = utils.$;
document.body.appendChild(utils.importTemplate('toolbar'));

var slideout = new Slideout({
  'panel': document.getElementById('map'),
  'menu': document.getElementById('toolbar')
});
document.querySelector('.toggle-button').addEventListener('click', function() {
  slideout.toggle();
});

$('addlayer').addEventListener('click', function() {
  utils.importComponent('addlayer');
});
$('addgoto').addEventListener('click', function() {
  utils.importComponent('center');
});
$('adddraw').addEventListener('click', function() {
  utils.importComponent('draw');
});
$('addmapDef').addEventListener('click', function() {
  utils.importComponent('mapdef');
});
module.exports = $('toolbar');
