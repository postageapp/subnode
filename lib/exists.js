// == Imports ===============================================================

const path = require('path');
const fs = require('fs');

// == Exported Functions ====================================================

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }
  catch (e) {
    switch (e.code) {
      case 'ENOENT':
        return false;
      default:
        throw e;
    }
  }
}

// == Exports ===============================================================

module.exports = {
  isFile: isFile
};
