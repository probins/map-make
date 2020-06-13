import e from"./geolocation.htm.js";import t from"./component.js";var o=new t(e,"geolocation");import n from"../../ext/ol.js";import i from"../../olMap.js";var r=i.get(),a=o.getTemplate("geolocation");r.addControl(new n.control.Control({element:a}));import l from"../../utils.js";var s=l.$,g="Unable to retrieve your location",c="Position outside map extent",m="Geolocation is not supported by your browser",p=(a=o.getTemplate("geomarker")).getElementById("geomarker"),d=new n.Overlay({positioning:"center-center",element:p});r.addOverlay(d),s("#geolocationbutton").addEventListener("click",(function(){navigator.geolocation?navigator.geolocation.getCurrentPosition((function(e){var t=[parseFloat(e.coords.longitude),parseFloat(e.coords.latitude)];t=n.proj.transform(t,"EPSG:4326",r.get("view").getProjection());var o=r.get("view").extent;if(o[0]<=t[0]&&t[0]<=o[2]&&o[1]<=t[1]&&t[1]<=o[3]){r.get("view").setCenter(t),r.get("view").setZoom(r.get("view").zoomIn);var i=e.heading?e.heading-45:-45;p.firstChild.style.transform="rotate("+i+"deg)",d.set("position",t)}else alert(c)}),(function(){alert(g)})):alert(m)}));import"./toolbar.js";s("#help-content").appendChild(o.getTemplate("geolocationhelp")),s("#geolocation-title").addEventListener("click",(function(){var e=this.nextElementSibling;e.style.display="block"==e.style.display?"none":"block"}));