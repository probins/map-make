/**
 * SRTM Relief in LAEA EPSG:3035
 * Code: srtm/laea
 * FIXME: attribution English
 */
import getLayers from '../tileimage.js';
import proj from '../../projections/3035.js';

const extent = [2409891.715, 1328424.080, 6143417.136, 5330401.505],
    resolutions = [4000, 3000, 2000, 1000];

const options = {
  extent: extent,
  id: 'SRTM LAEA',
  sourceOptions: {
    projection: proj.projCode,
    tileUrlFunction: function(coordinate) {
      const revamp = (coordinate[2]*-1)-1;
      return 'https://maps.peterrobins.co.uk/srtm/3035/' + coordinate[0] +
          '/' + coordinate[1] + '/' + revamp + '.png';
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
  projCode: proj.projCode,
  resolutions: resolutions
};
