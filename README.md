<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> [Browserify](http://browserify.org/) plugin for _[Fly][fly]_.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]
[![][mit-badge]][mit]

## Usage
> Check out the [documentation](https://github.com/substack/node-browserify#browserifyfiles--opts) to see the available options.

### Install

```a
npm install -D fly-browserify
```

### Example

#### ES6
```js
export default function* () {
  yield this.clear("build")
  yield this
    .source(paths.scripts)
    .browse({ transform [require("reactify")] })
    .concat("bundle.js")
    .target("lib")
}
```
#### Earl Grey
```earl-grey
require: earlify
provide: default
default = *->
  yield this.clear("build")
  yield chain this:
    @source: paths.scripts
    @browse: { transform = {earlify} }
    @concat: "bundle.js"
    @target: .lib
```

# License

[MIT][mit] © [Jake Russo][author] et [al][contributors]


[mit]:          http://opensource.org/licenses/MIT
[author]:       http://github.com/MadcapJake
[contributors]: https://github.com/MadcapJake/fly-browserify/graphs/contributors
[releases]:     https://github.com/MadcapJake/fly-browserify/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-browserify
[npm-ver-link]: https://img.shields.io/npm/v/fly-browserify.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-browserify.svg?style=flat-square
[travis-link]:  https://travis-ci.org/MadcapJake/fly-browserify
[travis-badge]: http://img.shields.io/travis/MadcapJake/fly-browserify.svg?style=flat-square
