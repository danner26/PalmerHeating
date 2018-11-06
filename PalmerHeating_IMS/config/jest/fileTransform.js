'use strict';
// http://facebook.github.io/jest/docs/tutorial-webpack.html

const path = require('path');

module.exports = {
  process(src, filename) {
    return 'module.exports = ${JSON.stringify(path.basename(filename))};';
  },
};
