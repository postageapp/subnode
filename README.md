# Subnode

A Node.js launcher for [Sublime Text](http://sublimetext.info) that can be
made aware of different methods for launching `.js` source files.

## Installation

Make `subnode` the default run wrapper when triggering "Build" for JavaScript.
This is in the `Nodejs.sublime-build` file in `Packages/Nodejs`. To quickly
open that, use the "Sublime Text 2 > Preferences >  Browse Packages..." option.

Once there, change the command for your platform to:

    "cmd": [ "subnode --debug $file" ]

This may require a quit/relaunch for the editor to take full effect.

## Test Detection

Any script in a directory named `test` are run with the script defined in
`package.json` under `scripts.test`. In the case of something like
[`mocha`](https://mochajs.org), it's expected to have a configuration like:

    "scripts": {
      "test": "mocha"
    }

In this case the command run will be:

    <directory>/node_modules/.bin/mocha <script>

To execute a script using the wrapper:

    subnode <script>

## Options

To suppress ANSI color which may confuse the editor:

    subnode --no-tty <script>

