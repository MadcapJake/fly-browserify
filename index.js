const browserify = require('browserify')

module.exports = function () {
  const compile = (compiler, cb) => {
    return this.unwrap((files) => {
      files.forEach(file => compiler.add(file))
      compiler.bundle(function (err, buf) {
        if (err) throw err
        cb(null, buf.toString())
      })
    })
  }
  this.filter('browserify', (source, options) => {
    const b = browserify(options)
    return this.defer(compile.bind(this))(b)
  })
}
