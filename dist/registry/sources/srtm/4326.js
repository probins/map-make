import{g as t}from"../../../tileimage-8ca12d47.js";import"../../../TileImage-10f9535a.js";import"../../../size-aa14a1dc.js";import"../../../Source-441004cf.js";const e=[-11,35,30,70],r=[.06,.04,.02,.01],i={extent:e,id:"SRTM 4326",sourceOptions:{projection:"EPSG:4326",tileUrlFunction:function(t){if(null===t)return;let e=""+t[1];1===e.length&&(e="0"+e);let r=""+(-1*t[2]-1);return 1===r.length&&(r="0"+r),"https://maps.peterrobins.co.uk/srtm/4326/0"+t[0]+"/000/000/0"+e+"/000/000/0"+r+".png"},attributions:'SRTM30 data from <a href="http://www2.jpl.nasa.gov/srtm/" target="_blank">NASA/JPL</a>'},tileGridOptions:{extent:e,tileSize:[200,200],origin:[e[0],e[1]],resolutions:r}};var o={getLayers:function(){return t(i)},extent:e,projCode:"EPSG:4326",resolutions:r};export default o;
