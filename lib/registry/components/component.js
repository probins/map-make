/** Component class
 *
 *  Components are add-ons with visual content
 *  They have one or more templates stored in an HTML file with the same name
 *  as the js module.
 *  @param {string} tpl HTML template file
 *  @param {string} name Optional name to be added to mapDef.components
 */

var mapDef = require('mapDef').get();

function Component(tpl, name) {
  // parse html
  var div = document.createElement('div');
  div.innerHTML = tpl;

  // import template(s)
  this.templates = {};
  var templates = div.querySelectorAll('template');
  for (var i = 0; i<templates.length; i++) {
    this.templates[templates[i].getAttribute('id')] = document.importNode(templates[i].content, true);
  }

  if (name) {
    mapDef.components = mapDef.components || [];
    if (mapDef.components.indexOf(name) == -1) {
      mapDef.components.push(name);
    }
  }
}

Component.prototype.getTemplate = function(name) {
  return this.templates[name + 'template'];
};

module.exports = Component;
