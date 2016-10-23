# fly-browserify [![][travis-badge]][travis-link]

> [Browserify](http://browserify.org/) plugin for Fly



## Install

```
npm install --save-dev fly-browserify
```

## API

### .browserify(options)

Please see [Browserify's documentation](https://github.com/substack/node-browserify#browserifyfiles--opts) for a full list of available options.

#### options.entries

Type: `string` or `array`<br>
Default: `''`

Define "entry" files, which represent new bundles. _Optional._ See an [example usage](#direct-paths-via-optsentries).

> **Note:** If not specified, `fly-browserify` will assumes **all** files within `fly.source()` are new bundle entries.

> **Important:** This plugin (`fly-browserify`) enforces **new a bundle per entry** unlike `browserify`. 

Using this option is particularly handy when your task (eg, `scripts`) contains plugin methods whose source files should be more than your entry files.

```js
exports.scripts = function * () {
  yield this.source('src/scripts/app.js')
    .xo() // ONLY lints one file
    .browserify() // make 'app.js' bundle
    .target('dist/js'); //=> dist/js/app.js
// VS
  yield this.source('src/**/*.js')
    .xo() // lints ALL files
    .browserify({
      entries: 'src/scripts/app.js'
    }) // make 'app.js' bundle
    .target('dist/js'); //=> dist/js/app.js
}
```

## Usage

### Basic

```js
exports.default = function * () {
  yield this.source('src/scripts/app.js')
    .browserify()
    .target('dist');
};
```

### Transforms

There's a huge list of [browserify transforms](https://github.com/substack/node-browserify/wiki/list-of-transforms) available to you. You may `require()` any of them & include their functionalities in your bundles.

```js
exports.default = function * () {
  yield this.source('src/scripts/app.js')
    .browserify({
      transform: [require('reactify')]
    })
    .target('dist');
};
```

### Multiple Bundles

There are a handful of ways you can create multiple `browserify` "bundles" without the need to repeat your task.

#### Direct Paths via `fly.source()`

```js
exports.default = function * () {
  yield this.source([
      'src/scripts/app.js',
      'src/scripts/admin.js'
    ])
    .browserify()
    .target('dist');
}
```

#### Glob Patterns via `fly.source()`

```js
exports.default = function * () {
  yield this.source('src/entries/*.js')
    .browserify()
    .target('dist');
}
```

#### Direct Paths via `opts.entries`

```js
exports.default = function * () {
  yield this.source('src/**/*.js')
    .browserify({
      entries: [
       'src/scripts/app.js',
       'src/scripts/admin.js'
      ]
    })
    .target('dist');
}
```

## License

MIT © [Jake Russo][author] et [al][contributors]


[mit]:          http://opensource.org/licenses/MIT
[author]:       http://github.com/MadcapJake
[contributors]: https://github.com/MadcapJake/fly-browserify/graphs/contributors
[changelog]:     https://github.com/MadcapJake/fly-browserify/blob/master/CHANGELOG.md
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-browserify
[npm-ver-badge]: https://img.shields.io/npm/v/fly-browserify.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-browserify.svg?style=flat-square
[travis-link]:  https://travis-ci.org/MadcapJake/fly-browserify
[travis-badge]: http://img.shields.io/travis/MadcapJake/fly-browserify.svg?style=flat-square
