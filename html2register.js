"use strict";
let fs = require('fs');
let component = process.argv[2];
fs.readFile('lib/registry/components/' + component + '.html', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  fs.writeFile('register/registry/components/' + component + '.htm.js',
      '"use strict";System.register([],function(_export,_context){return{setters:[],execute:function(){_export("default",'+JSON.stringify(data)+');}};});', function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("htm saved");
    }
  });
});
