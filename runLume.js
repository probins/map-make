// deno run -A --unstable runLume.js

import lume from "https://deno.land/x/lume@v0.13.2/mod.js";
import terser from 'https://deno.land/x/lume@v0.13.2/plugins/terser.js';

const site = lume({
  src: "lib",
  dest: "dist",
  prettyUrls: false
});

const options = {
  // "sourceMap": true
};

site.use(terser(options));

site.ignore("depsfromoldeps.js", "depsfromoldepscdn.js", "oldeps.js", "oldepscdn.js", "registry/components/Readme.md", "registry/projections/Readme.md", "registry/sources/Readme.md");
site.copy("css");
site.copy("ext");
site.copy("font");
site.copy("registry/components/ext");
site.copy("samples");

site.build();
