var utils = require('utils');
var $ = utils.$;
  document.body.appendChild(document.importNode($('toolbarlink').import
      .getElementById('toolbartemplate').content, true));
  $('addlayer').addEventListener('click', function() {
    utils.importComponent('addlayer', 'lib/registry/components/addlayer.html');
  });
  $('addgoto').addEventListener('click', function() {
    utils.importComponent('center', 'lib/registry/components/center.html');
  });
  $('adddraw').addEventListener('click', function() {
    utils.importComponent('adddraw', 'lib/registry/components/draw.html');
  });
  module.exports = $('toolbar');
