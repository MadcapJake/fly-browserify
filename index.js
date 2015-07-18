module.exports = function () {
  const browserify = (_, opts, cb) => {
    const compiler = require("browserify")(opts)
    return this.unwrap((files) => {
      files.forEach(file => compiler.add(file))
      compiler.bundle(function (err, buf) {
        if (err) throw err
        cb(null, buf.toString())
      })
    })
  }
  this.filter("browse", (source, options) =>
    this.defer(browserify)(source, options)
  )
}
