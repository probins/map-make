
/** Rasters are defined from registry scripts, one for each source/layer.
 * - each raster defines the projection/resolutions/extent for that source
 * - a different view is created for each projection
 * - only 1 raster can currently be displayed at one time
 * Options are set in the html page.
 * valid options are:
 * - map options:
 * -- target (creates one if not present)
 * -- widgets: currently scaleline, latlonmouse (mousePosition in latlons),
 *    projectedmouse (mousePosition in projected coords), tooltip, popup;
 *    a layerswitcher is always included
 * -- noKeyboardPan: true (by default, keyboard pan/zoom are enabled on the
 *    viewport div; use this to override)
 * - layers options:
 * -- rasters: an array listing raster ids
 *    ids are defined in the registry scripts, included with a script tag,
 *    so each raster id should have a corresponding script.
 * -- vectors: an array of objects with the following options:
 * --- url
 * --- parser (should be the name of the ol class: GeoJSON, KML, GPX ...)
 * --- attribution
 * --- optionally, style can be given to override ol defaults
 * - view options:
 * -- initial center {lat: nn, lon: nn} and zoom level
 *    By default maps with vectors zoom to the vector data
 *    and maps with no vectors zoom to the extent of the tile data
 * -- rotation
 * -- if no rasters, projCode can be set, else 4326 used
 */
function parseQueryString(){var e,t,s,r,o={},a=window.location.search.substring(1).split("&");for(s=0;s<a.length;s++)switch(e=a[s].split("="),e[0]){case"mapDef":return{mapDef:e[1]};case"rasters":o.rasters=e[1].split(",");break;case"lat":o.lat=parseFloat(e[1]);break;case"lon":o.lon=parseFloat(e[1]);break;case"zoom":o.zoom=parseFloat(e[1]);break;case"widgets":for(o.widgets={},t=e[1].split(","),r=0;r<t.length;r++)o.widgets[t[r]]=!0}return o.lat&&o.lon&&(o.center={lat:o.lat,lon:o.lon}),o}function displayForm(e){var t=document.getElementById("status");t.style.top="5%",t.style.left="5%",t.innerHTML=e,document.getElementById("mapDef").addEventListener("change",function(){window.location.search="mapDef="+this.value}),document.getElementById("mapDefForm").addEventListener("click",processForm)}function processForm(){var e="rasters="+document.options.rasters.value;""!==document.options.lat.value&&(e+="&lat="+document.options.lat.value),""!==document.options.lon.value&&(e+="&lon="+document.options.lon.value),""!==document.options.zoom.value&&(e+="&zoom="+document.options.zoom.value);var t=[],s=document.options.widgets;for(i=0;i<s.length;i++)s[i].checked===!0&&t.push(s[i].value);t.length>0&&(e+="&widgets="+t.join()),window.location.search=e}var registry="~/registry/",sourceDir=registry+"sources/",styleDir=registry+"styles/",htmlDir="~/html/",errors={noRaster:"Raster or style does not exist",noMapdef:"mapDef does not exist"},config={olMap:"~/olMap",projWrapper:"~/plugins/projWrapper",proj:"cdnjs:proj4js/1.1.0/proj4js-compressed.js!projWrapper"};jspm.config({map:config}),window.Proj4js={};var mapDef,i,qsOptions,md;if(window.location.search?(qsOptions=parseQueryString(),qsOptions.mapDef&&(mapDef=qsOptions.mapDef)):(md=document.getElementById("mapDef"),md&&(mapDef=md.innerHTML)),mapDef||qsOptions){var imports=["olMap"];mapDef&&imports.push(mapDef+"!json"),jspm.import(imports,function(e){var t,s,r=arguments[1]||qsOptions||{projCode:"EPSG:4326"},o=[],a=[];if(r.rasters)for(i=0;i<r.rasters.length;i++){if("object"==typeof r.rasters[i])for(s in r.rasters[i])t=s;else t=r.rasters[i];config[t]=sourceDir+t,o.push(t)}if(r.vectors)for(i=0;i<r.vectors.length;i++)if(r.vectors[i].styles)for(var n=0;n<r.vectors[i].styles.length;n++){var l=r.vectors[i].styles[n];a.push(l),o.push(styleDir+l+".json!json")}jspm.config({map:config}),jspm.import(o,function(){var t;if(e.createMap(r.target,r.noKeyboardPan),r.rasters){var s,o,n={};for(t=0;t<r.rasters.length;t++){if("object"==typeof r.rasters[t])for(o in r.rasters[t])s=o;else s=r.rasters[t];n[s]=arguments[t]}e.createRasters(n,r)}else e.create4326View();if(r.vectors){var i={};if(a)for(t=r.rasters.length;t<arguments.length;t++)i[a[t-r.rasters.length]]=arguments[t];for(t=0;t<r.vectors.length;t++)r.vectors[t].styles&&(r.vectors[t].styles[0]=i[r.vectors[t].styles[0]]);e.createVectors(r.vectors),r.center||r.zoom?r.rasters&&e.make1stLayerVisible():e.addFeaturesListener(),r.rasters||e.setDefaultView("EPSG:4326")}if(r.widgets&&e.addWidgets(r.widgets),r.center||r.zoom){var l=document.getElementById("status");l&&(l.style.display="none")}r.noKeyboardPan||e.setFocus(),document.body.appendChild(e.getLayersDiv())},function(){alert(errors.noRaster)})},function(){alert(errors.noMapdef)})}else jspm.import(htmlDir+"initialForm.html!text",displayForm);
//# sourceMappingURL=dist/map-make.js.map