let browserify = function (opts) {
  const compiler = require("browserify")(opts)
  this.unwrap((files) => {
    files.forEach(file => compiler.add(file))
    compiler.bundle(function (err, buf) {
      err ? this.err(err) : this.debug(buf)
      return buf
    })
  })
}

module.exports = function () {
  this.browse = function (options) {
    return this.defer(browserify)(options)
  }
}
