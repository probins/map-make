var utils = require('utils');
var $ = utils.$;
var componentDir = 'lib/' + utils.componentDir;
  document.body.appendChild(document.importNode($('toolbarlink').import
      .getElementById('toolbartemplate').content, true));
  $('mapDef').addEventListener('change', function() {
    window.location.search = 'mapDef=' + this.value;
  });
  $('addlayer').addEventListener('click', function() {
    utils.importComponent('addlayer', componentDir + 'addlayer.html');
  });
  $('addgoto').addEventListener('click', function() {
    utils.importComponent('center', componentDir + 'center.html');
  });
  $('adddraw').addEventListener('click', function() {
    utils.importComponent('adddraw', componentDir + 'draw.html');
  });
  module.exports = $('toolbar');
