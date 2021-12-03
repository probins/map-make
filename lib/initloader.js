/**
 * Initial bootstrap loader.
 *
 * Injects CSS into <head>, with onload function to create 'loading' spinner.
 * Sets a window onload function which runs initSystem(),
 * which bootstraps the map-make module.
 *
 * The configuration variables determine which package versions etc to load.
 * By default, these are the values in `configVars` below, relative to `baseURL`,
 * which is by default relative to this script. These can be overridden by setting
 * the `data-configVars` attribute in the script tag loading `initloader.js`.
 * This can be used to use different versions of software, or to load, for example, from localhost.
 * For example,
 *   <script data-configVars='{"css":"../another/path/css/map-make.css","baseURL":"./further/path/map-make/lib/"}'
 *       src="../map-make/lib/initloader.js"></script>
 * will set `css` and `baseURL` in `configVars`.
 *
 * The default setting is:
 * - in map-make.html: src="https://cdn.jsdelivr.net/gh/probins/map-make@master/dist/initloader.js
 * - in initloader:
 * -- baseURL is initially the script-tag src directory, i.e. by default https://cdn.jsdelivr.net/gh/probins/map-make@master/dist/
 * -- if this contains 'master' (which it does by default), replace that with the configVars.tag
 * -- if data-configVars are present, use baseURL there instead
 * -- if this is relative, convert to absolute using document.baseURI
 * -- if configVars.css is a relative address (which it is by default, i.e. load from map-make@<tag>/dist/), prepend baseURL
 * -- on window.load, import(`${baseURL}/map-make.js`)
 *
 * This all enables not only testing from localhost, but also loading from any tag
 * on Github from a localhost html file. CSS can also be loaded from a different directory.
 *
 * Of course, when a new version of map-make is released, the new code will only be used
 * when `configVars.tag` has been updated.
 */

(() => {
  // default config
  const configVars = {
    tag: '3.2.0',
    // can also be absolute url
    css: 'css/map-make.css',
    // used for preload
    font: 'font/fontello.woff2'
  };

  let script;
  const fragment = document.createDocumentFragment();

  // baseURL by default relative to this script
  const currentScript = document.currentScript;
  const src = currentScript.getAttribute('src');
  let baseURL = src.substring(0, src.lastIndexOf('/') + 1);

  const localConfig = JSON.parse(currentScript.getAttribute('data-configVars'));
  for (const conf in localConfig) {
    switch (conf) {
      case 'css':
        // assume font at same place as css
        configVars.font = localConfig[conf].replace(configVars.css, configVars.font);
        configVars.css = localConfig[conf];
        break;
      case 'baseURL':
        baseURL = localConfig[conf];
        break;
      default:
        break;
    }
  }
  // relative url, convert to absolute
  if (baseURL.indexOf('.') === 0) {
    baseURL = new URL(baseURL, document.baseURI).href;
  }
  // if master, use tagged commit
  if (baseURL.indexOf('master') !== -1) {
    baseURL = baseURL.replace('master', configVars.tag);
  }

  // preload font
  let link = document.createElement('link');
  link.rel = 'preload';
  // if configVars.css not absolute url, prepend baseURL
  link.href = (configVars.css.indexOf('h') == 0) ?
      configVars.font : baseURL + configVars.font;
  link.as = 'font';
  link.type = "font/woff2";
  link.setAttribute('crossorigin', '');
  fragment.appendChild(link);

  // load configVars.css from map-make
  link = document.createElement('link');
  link.rel = 'stylesheet';
  // if configVars.css not absolute url, prepend baseURL
  link.href = (configVars.css.indexOf('h') == 0) ?
      configVars.css : baseURL + configVars.css;
  link.onload = () => {
    // create status div
    const statusDiv = document.createElement('div');
    statusDiv.id = 'status';
    // add spinner to it
    statusDiv.innerHTML = '<i class="fa fa-spinner fa-pulse fa-5x"></i>';
    // and add to body
    document.body.appendChild(statusDiv);
  };

  fragment.appendChild(link);

  // initial load dependencies for preloading
  // atm more trouble than worth
  // const dependencies = [
  //   // from the branches
  //   './olMap.js', './deps.js', // ol deps depends on whether src or build
  //   // toolbar and its static deps always needed
  //   './registry/components/toolbar.js', './registry/components/toolbar.htm.js',
  //   './registry/components/component.js', './registry/components/ext/slideout.min.js',
  //   // static deps
  //   './mapDef.js', './utils.js'
  // ];

  // ... preload dependencies
  // currently Chrome only
  // can be commented out if get multi-file build working
  // dependencies.forEach(depend => {
  //   link = document.createElement('link');
  //   link.rel = 'modulepreload';
  //   link.href = baseURL + depend;
  //   fragment.appendChild(link);
  // });

  document.head.appendChild(fragment);

  // import bootstrap on window.load
  window.addEventListener('load', () => {
    // bootstrap load of map-make module
    import(`${baseURL}map-make.js`)
    .catch(err => {
      console.log(err);
      document.body.innerHTML = 'Error loading module(s)';
      return;
    });
  });
})();
