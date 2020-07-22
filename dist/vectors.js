import t from"./ext/ol.js";import e from"./olMap.js";var r=e.get();import o from"./registry/components/layerswitcher.js";import i from"./utils.js";import a from"./rasters.js";import n from"./mongo.js";var l=i.$,s={normal:{stroke:{color:"rgba(0, 0, 255, 0.6)",width:3},fill:{color:"rgba(255, 255, 255, 0.6)"},image:{radius:7,fillColor:"#ffcc33"}},highlight:{stroke:{color:"rgba(255, 0, 0, 0.6)",width:3},fill:{color:"rgba(255, 0, 0, 0.1)"},image:{radius:7,fillColor:"#ffcc33"}}},f={};["GeoJSON","GPX","KML"].forEach((function(e){f[e]=new t.format[e]})),f.mongo=n;var c={geojson:"GeoJSON",gpx:"GPX",kml:"KML"};function g(t){return f[t]}function d(){return r.getLayers().item(1).get("layers")}function u(t){var e=document.getElementById(t.target.htmlFor)||t.target;this.getLayers().item(1).get("layers").getArray().filter((function(t){return t.getProperties().id==e.value}))[0].set("visible",e.checked)}function y(e){e.vectors.forEach((function(a){var n,f,y=a.url,h={featureProjection:r.get("view").getProjection()},p={attributions:a.attribution||""},v=y||a.filename;v&&!a.format&&(f=v.substring(v.lastIndexOf(".")+1),n=c[f]),(n=a.format||n)&&(p.format=g(n)),a.file?p.features=p.format.readFeatures(a.file,h):y&&(a.strategy&&"bbox"==a.strategy&&(p.strategy=function(t,e){return[t]}),p.loader=function(e,r,o){if(a.strategy&&"bbox"==a.strategy){var l=t.proj.transformExtent(e,o,"EPSG:4326");y=a.url+[[l[0].toFixed(6),l[1].toFixed(6)],[l[2].toFixed(6),l[1].toFixed(6)],[l[2].toFixed(6),l[3].toFixed(6)],[l[0].toFixed(6),l[3].toFixed(6)],[l[0].toFixed(6),l[1].toFixed(6)]].join("],[")+"]]]}}}}"}fetch(y).then((function(t){return"GeoJSON"==n||"mongo"==n?t.json():t.text()})).then((function(t){var e=p.format.readFeatures(t,h);d().getArray().filter((function(t){return t.getProperties().id==a.id}))[0].get("source").addFeatures(e)})).catch((function(){i.errors.fetchFail()}))});var x=new t.source.Vector(p);!0!==a.add||!y||a.strategy&&"bbox"==a.strategy||x.once("change",(function(t){r.get("view").fit(t.target.getExtent())}));var b,w={source:x,id:a.id||y},F={};for(b in s.normal)F[b]=s.normal[b];if(a.style)for(b in a.style)F[b]=a.style[b];s[w.id]=F,w.style=function(t){return m(w.id,t)},d().push(new t.layer.Vector(w)),!0===a.add&&a.file&&r.get("view").fit(x.getExtent());var k=o.addVectorDiv(a);if(k[0].addEventListener("click",u.bind(r)),k[1]){var j=e.components||[];-1==j.indexOf("popup")&&(l("#featuredisplayoption").style.display="block"),-1==j.indexOf("tooltip")&&(l("#tooltipoption").style.display="block")}}))}function m(e,r){var o={width:s[e].stroke.width,color:s[e].stroke.color,lineDash:s[e].stroke.lineDash};["color","width","lineDash"].forEach(t=>{if(Array.isArray(o[t])){var e=r.get(o[t][0]);"object"==typeof o[t][1]?o[t]=o[t][1][e]:o[t]=e==o[t][1]?o[t][2]:o[t][3]}});var i=s[e].image.fillColor;return Array.isArray(i)&&(i=r.get(i[0])==i[1]?i[2]:i[3]),new t.style.Style({stroke:new t.style.Stroke(o),fill:new t.style.Fill(s[e].fill),image:new t.style.Circle({radius:s[e].image.radius,fill:new t.style.Fill({color:i})})})}export default{addInitial:function(t){var o,i,n,s;y(t),t.center||t.zoom?t.rasters&&a.makeActiveLayerVisible():(o=d().getArray(),i=[1/0,1/0,-1/0,-1/0],n=0,s=function(t){var e,s;e=i,(s=t.target.getExtent())[0]<e[0]&&(e[0]=s[0]),s[2]>e[2]&&(e[2]=s[2]),s[1]<e[1]&&(e[1]=s[1]),s[3]>e[3]&&(e[3]=s[3]),++n==o.length&&(r.get("view").fit(i),a.makeActiveLayerVisible(),l("#status").style.display="none")},o.forEach((function(t){t.get("source").once("change",s)}))),t.rasters||e.use4326View()},add:y,getFormat:g,getLayers:d,getStyle:m};