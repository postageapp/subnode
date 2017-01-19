// == Imports ===============================================================

const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

const packageFind = require('./package').find;
const isFile = require('./exists').isFile;

// == Exported Class ========================================================

class Child {
  constructor(source, args, options) {
    this.source = source;
    this.options = options || { };

    if (typeof(args) == 'undefined') {
      this.args = [ ];
    }
    else if (Array.isArray(args)) {
      this.args = args;
    }
    else {
      this.args = [ args ];
    }
  }

  launchArgs() {
    var dirname = path.join(process.cwd(), path.dirname(this.source));
    var exec = [ this.source ];

    if (dirname.match(/\/test(?:\/|$)/)) {
      var packagePath = packageFind(dirname);

      if (packagePath) {
        var packageData = require(packagePath);

        var testCommand = packageData.scripts && packageData.scripts.test;

        if (testCommand) {
          exec = [
            path.join(path.dirname(packagePath), 'node_modules/.bin/' + testCommand),
            this.source
          ];
        }
      }
    }

    return exec.concat(this.args);
  }

  spawn() {
    var node = process.argv[0];

    this.process = spawn(
      node,
      this.launchArgs(),
      {
        stdio: this.options.tty ? 'inherit' : 'pipe'
      }
    );

    return process.pid;
  }

  kill(signal) {
    return process.kill(signal || 'SIGTERM');
  }

  join() {
    if (this.process.stdout) {
      this.process.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
    }

    if (this.process.stderr) {
      this.process.stderr.on('data', (data) => {
        process.stderr.write(data);
      });
    }
    
    this.process.on('close', (code) => {
      process.exit(code);
    });
  }
}

// == Exports ===============================================================

module.exports = Child;
