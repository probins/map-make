var t,e,n={},o=document.querySelector("map-def");function r(t,e){var n;switch(e[0]){case"rasters":case"r":t.rasters=[],e[1].split(",").forEach((function(e){var n=-1===e.indexOf("{")?e:JSON.parse(decodeURIComponent(e));t.rasters.push(n)}));break;case"lat":t.lat=parseFloat(e[1]);break;case"lon":t.lon=parseFloat(e[1]);break;case"zoom":case"z":t.zoom=parseFloat(e[1]);break;case"components":case"c":t.components=e[1].split(",");break;case"vectors":case"v":e[1]=e[1].replace(/\s+/g," "),n=-1!=e[1].indexOf("[")?JSON.parse(decodeURIComponent(e[1])):[e[1]],t.vectors=[],n.forEach((function(e){var n;"string"==typeof e?n={url:e,id:e}:((n={url:e.url}).id=e.id||e.url,e.attribution&&(n.attribution=e.attribution),e.style&&(n.style=e.style),e.format&&(n.format=e.format),e.strategy&&(n.strategy=e.strategy),e.noDisplay&&(n.noDisplay=e.noDisplay)),t.vectors.push(n)}));break;default:t[e[0]]=e[1]}return t}function a(e){t=e}o?n=function(t){for(var e={},n=t.children,o=0;o<n.length;o++){e=r(e,[n[o].localName,n[o].innerHTML])}return e}(o):window.location.search&&(n=function(){var t,e={};return window.location.search.substring(1).split("&").forEach((function(n){t=n.split("="),e=r(e,t)})),e}()),n.lat&&n.lon&&(n.center={lat:n.lat,lon:n.lon}),n&&n.mapdef&&(e=n.mapdef),e||a(n||{projCode:"EPSG:4326"});export default{init:function(){return new Promise((function(n,o){e?fetch(decodeURIComponent(e)).then((function(t){return t.json()})).then((function(t){a(t),n(t)})).catch((function(){o()})):n(t)}))},get:function(){return t},set:a};