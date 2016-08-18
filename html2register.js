"use strict";
let fs = require('fs');
fs.readFile('lib/registry/components/toolbar.html', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  fs.writeFile('register/registry/components/toolbar.htm.js', '"use strict";System.register([],function(_export,_context){return{setters:[],execute:function(){_export("default",'+JSON.stringify(data)+');}};});', function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("htm saved");
    }
  });
});
