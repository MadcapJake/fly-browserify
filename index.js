const browserify = require("browserify")

module.exports = function () {
  this.browse = function (opts) {
    const compiler = browserify(opts)
    return new Promise(function (resolve, reject) {
      this.unwrap((files) => {
        files.forEach(file => compiler.add(file))
        compiler.bundle((err, buf) => err
          ? reject(err)
          : resolve(buf.toString()))
      })
    }.bind(this))
  }
}
