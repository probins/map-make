import{a as t,h as e,D as i,i as s}from"./TileImage-10f9535a.js";import{a as r}from"./uri-6d91ca6a.js";import{z as o,I as a,aJ as n,bF as h,aY as g,aF as l,aE as p,k as u,a as c,a8 as _,bA as T}from"./size-aa14a1dc.js";import{c as m}from"./string-4ef30a9f.js";var S="carmentaserver",d="geoserver",R="mapserver",E="qgis";class A extends t{constructor(t){const e=t||{},i=e.params||{},s=!("TRANSPARENT"in i)||i.TRANSPARENT;super({attributions:e.attributions,cacheSize:e.cacheSize,crossOrigin:e.crossOrigin,imageSmoothing:e.imageSmoothing,opaque:!s,projection:e.projection,reprojectionErrorThreshold:e.reprojectionErrorThreshold,tileClass:e.tileClass,tileGrid:e.tileGrid,tileLoadFunction:e.tileLoadFunction,url:e.url,urls:e.urls,wrapX:void 0===e.wrapX||e.wrapX,transition:e.transition}),this.gutter_=void 0!==e.gutter?e.gutter:0,this.params_=i,this.v13_=!0,this.serverType_=e.serverType,this.hidpi_=void 0===e.hidpi||e.hidpi,this.tmpExtent_=o(),this.updateV13_(),this.setKey(this.getKeyForParams_())}getFeatureInfoUrl(t,s,r,o){const c=a(r),_=this.getProjection();let T=this.getTileGrid();T||(T=this.getTileGridForProjection(c));const m=T.getZForResolution(s,this.zDirection),S=T.getTileCoordForCoordAndZ(t,m);if(T.getResolutions().length<=S[0])return;let d=T.getResolution(S[0]),R=T.getTileCoordExtent(S,this.tmpExtent_),E=n(T.getTileSize(S[0]),this.tmpSize);const A=this.gutter_;0!==A&&(E=h(E,A,this.tmpSize),R=g(R,d*A,R)),_&&_!==c&&(d=e(_,c,t,d),R=l(R,c,_),t=p(t,c,_));const v={SERVICE:"WMS",VERSION:i,REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.params_.LAYERS};u(v,this.params_,o);const f=Math.floor((t[0]-R[0])/d),O=Math.floor((R[3]-t[1])/d);return v[this.v13_?"I":"X"]=f,v[this.v13_?"J":"Y"]=O,this.getRequestUrl_(S,E,R,1,_||c,v)}getLegendUrl(t,e){if(void 0===this.urls[0])return;const s={SERVICE:"WMS",VERSION:i,REQUEST:"GetLegendGraphic",FORMAT:"image/png"};if(void 0===e||void 0===e.LAYER){const t=this.params_.LAYERS;if(!(!Array.isArray(t)||1===t.length))return;s.LAYER=t}if(void 0!==t){const e=this.getProjection()?this.getProjection().getMetersPerUnit():1,i=28e-5;s.SCALE=t*e/i}return u(s,e),r(this.urls[0],s)}getGutter(){return this.gutter_}getParams(){return this.params_}getRequestUrl_(t,e,i,o,a,n){const h=this.urls;if(!h)return;if(n.WIDTH=e[0],n.HEIGHT=e[1],n[this.v13_?"CRS":"SRS"]=a.getCode(),"STYLES"in this.params_||(n.STYLES=""),1!=o)switch(this.serverType_){case d:const t=90*o+.5|0;"FORMAT_OPTIONS"in n?n.FORMAT_OPTIONS+=";dpi:"+t:n.FORMAT_OPTIONS="dpi:"+t;break;case R:n.MAP_RESOLUTION=90*o;break;case S:case E:n.DPI=90*o;break;default:c(!1,52)}const g=a.getAxisOrientation(),l=i;if(this.v13_&&"ne"==g.substr(0,2)){let t;t=i[0],l[0]=i[1],l[1]=t,t=i[2],l[2]=i[3],l[3]=t}let p;if(n.BBOX=l.join(","),1==h.length)p=h[0];else{p=h[_(s(t),h.length)]}return r(p,n)}getTilePixelRatio(t){return this.hidpi_&&void 0!==this.serverType_?t:1}getKeyForParams_(){let t=0;const e=[];for(const i in this.params_)e[t++]=i+"-"+this.params_[i];return e.join("/")}updateParams(t){u(this.params_,t),this.updateV13_(),this.setKey(this.getKeyForParams_())}updateV13_(){const t=this.params_.VERSION||i;this.v13_=m(t,"1.3")>=0}tileUrlFunction(t,e,s){let r=this.getTileGrid();if(r||(r=this.getTileGridForProjection(s)),r.getResolutions().length<=t[0])return;1==e||this.hidpi_&&void 0!==this.serverType_||(e=1);const o=r.getResolution(t[0]);let a=r.getTileCoordExtent(t,this.tmpExtent_),l=n(r.getTileSize(t[0]),this.tmpSize);const p=this.gutter_;0!==p&&(l=h(l,p,this.tmpSize),a=g(a,o*p,a)),1!=e&&(l=T(l,e,this.tmpSize));const c={SERVICE:"WMS",VERSION:i,REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};return u(c,this.params_),this.getRequestUrl_(t,l,a,e,s,c)}}export{A as T};