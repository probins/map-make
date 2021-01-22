/**
 * SRTM Relief in EPSG:4326
 * Uses old tilecache directory structure
 * Code: srtm/4326
 * FIXME: attribution English
 */
import getLayers from '../tileimage.js';

const extent = [-11, 35, 30, 70],
    resolutions = [0.06,0.04,0.02,0.01];

const options = {
  extent: extent,
  id: 'SRTM 4326',
  sourceOptions: {
    projection: 'EPSG:4326',
    tileUrlFunction: function(coordinate) {
      if (coordinate === null) {
        return undefined;
      }
      // pad x/y coords to 2 digits
      // in this case, they are never >2
      let x = ('' + coordinate[1]);
      if (x.length === 1) {
        x = '0' + x;
      }
      // reverse order
      const revamp = (coordinate[2]*-1)-1;
      let y = ('' + revamp);
      if (y.length === 1) {
        y = '0' + y;
      }
      return 'https://maps.peterrobins.co.uk/srtm/4326/0' + coordinate[0] +
          '/000/000/0' + x + '/000/000/0' + y + '.png';
    },
    attributions: 'SRTM30 data from <a href="http://www2.jpl.nasa.gov/srtm/" target="_blank">NASA/JPL</a>'
  },
  tileGridOptions: {
    extent: extent,
    tileSize: [200, 200],
    origin: [extent[0], extent[1]],
    resolutions: resolutions
  }
};

export default {
  getLayers: function() {
    return getLayers(options);
  },
  extent: extent,
  projCode: 'EPSG:4326',
  resolutions: resolutions
};
