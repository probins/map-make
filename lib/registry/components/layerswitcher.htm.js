export default `
<template id="layerswitchertemplate">
  <style>
    #layerswitchcontainer {
      border:1px double #D2D8DE;
    }
    #layerswitchtitle {
      background-color: #3fb;
      text-align: center;
    }
  </style>
  <div id="layerswitchcontainer">
    <div id="layerswitchtitle"><i>Layer Switcher</i></div>
    <div id="layerswitch"></div>
  </div>
</template>

<template id="rasterstemplate">
  <div><i>Rasters</i></div>
  <div id="rasters"></div>
</template>

<template id="vectorstemplate">
  <div><i>Vectors</i></div>
  <div id="vectors"></div>
</template>
`;
