import lume from "https://deno.land/x/lume/mod.js";
import terser from 'https://deno.land/x/lume/plugins/terser.js';

const site = lume({
  src: "lib",
  dest: "dist",
  prettyUrls: false
});

const options = {
  // "sourceMap": true
};

site.use(terser(options));

site.ignore("Readme.md", "registry/components/Readme.md", "registry/projections/Readme.md", "registry/sources/Readme.md");
site.copy("css");
site.copy("ext");
site.copy("font");
site.copy("registry/components/ext");
site.copy("samples");

export default site;
