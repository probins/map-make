import{bB as s,bC as e,bD as r}from"./size-aa14a1dc.js";import o from"https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/bareindex.js";const i=["EPSG:4326"];var n={addProjection:function(n,a){-1===i.indexOf(n)&&(o.defs(n,a),"EPSG:3857"!==n&&s(new e({code:n,units:a.units})),i.forEach(s=>{if("EPSG:4326"==s&&"EPSG:3857"==n);else{const e=o(s,n);r(s,n,e.forward,e.inverse)}}),i.push(n))}};export{n as c};