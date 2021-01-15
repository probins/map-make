/**
 * Component class
 *
 * Components are add-ons with visual content.
 * They have one or more templates stored in an HTML file with the same name
 * as the js module.
 *
 * Components added to the map can also be added to the mapDef.
 *
 *  @param {string} tpl HTML template file
 *  @param {string} name Optional name to be added to mapDef.components
 */

import md from '../../mapDef.js';
let mapDef = md.get();

function Component(tpl, name) {
  // parse html
  let div = document.createElement('div');
  div.innerHTML = tpl;

  // import template(s)
  this.templates = {};
  let templates = div.querySelectorAll('template');
  for (let i = 0; i < templates.length; i++) {
    this.templates[templates[i].getAttribute('id')] = document.importNode(templates[i].content, true);
  }

  if (name) {
    // add to mapDef
    mapDef.components = mapDef.components || [];
    if (mapDef.components.indexOf(name) == -1) {
      mapDef.components.push(name);
    }
    // hide toolbar button/option
    document.querySelector('#' + name + 'button,#' + name + 'option').style.display = 'none';
  }
}

Component.prototype.getTemplate = function(name) {
  return this.templates[name + 'template'];
};

export default Component;
