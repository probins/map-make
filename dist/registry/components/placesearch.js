import e from"./placesearch.htm.js";import t from"./component.js";var a=new t(e,"placesearch");import n from"../../utils.js";var o=n.$;import"./toolbar.js";o("#components-content").appendChild(a.getTemplate("placesearch"));import r from"../../ext/ol.js";import l from"../../olMap.js";var s=l.get();o("#placesearchbutton").addEventListener("click",(function(){var e=document.getElementById("searchfor").value,t=document.getElementById("placesearchapi").value,a=document.getElementById("placesearchcontinent").value,o="https://secure.geonames.org/searchJSON?maxRows=10&username="+t+"&isNameRequired=true&style=full&q="+e;a&&(o+="&continentCode="+a),o=o.replace(/amp;/g,"");var l=function(e,t){var a=[e,t];a=r.proj.transform(a,"EPSG:4326",s.get("view").getProjection());var n=s.get("view").extent;n[0]<=a[0]&&a[0]<=n[2]&&n[1]<=a[1]&&a[1]<=n[3]?(s.get("view").setCenter(a),s.get("view").setZoom(s.get("view").zoomIn)):alert("Coordinate outside map extent")},c=function(){l(parseFloat(this.dataset.lng),parseFloat(this.dataset.lat))};fetch(o).then((function(e){return e.json()})).then((function(e){!function(e){if(null!==e){var t,a,n=e.geonames;if(0!==n.length)if(1==n.length)t=parseFloat(n[0].lat),a=parseFloat(n[0].lng),l(a,t);else{for(var o="",r=0;r<n.length;r++){var s=n[r];o+='<a href="#" class="gotos" data-lat="'+(t=s.lat)+'" data-lng="'+(a=s.lng)+'">'+(s.name+", "+s.adminName1+", "+s.adminName2+", "+s.adminName3+", "+s.adminName4)+"</a><br />"}document.getElementById("searchResults").innerHTML=o;for(var m=document.querySelectorAll(".gotos"),i=0;i<m.length;i++)m[i].addEventListener("click",c)}else alert("No such place on geonames.org")}else alert("Nothing returned from geonames.org")}(e)})).catch((function(){n.errors.fetchFail()}))}));