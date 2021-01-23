/**
 * Exports $() (querySelector), $$() (querySelectorAll)
 */

function $(s) {
  return document.querySelector(s);
}
function $$(s) {
  return document.querySelectorAll(s);
}

export { $, $$ };
