let browserify = function (opts) {
  const compiler = require("browserify")(opts)
  this.unwrap((files) => {
    files.forEach(file => compiler.add(file))
    compiler.bundle(function (err, buf) {
      if (err) throw err
      // console.log(buf.toString())
      return buf.toString()
    })
  })
}

module.exports = function () {
  this.filter("browse", function (_, options) {
    return this.defer(browserify.bind(this))(options)
  })
}
