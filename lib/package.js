// == Imports ===============================================================

const fs = require('fs');
const path = require('path');

const isFile = require('./exists').isFile;

// == Exported Functions ====================================================

function find(base) {
  var dir = path.resolve(base);
  var dirLast;

  while (dir != dirLast) {
    var packagePath = path.join(dir, 'package.json');

    if (isFile(packagePath)) {
      return packagePath;
    }

    dirLast = dir;

    dir = path.join(dir, '..');
  }
}

// == Exports ===============================================================

module.exports = {
  find: find
};
