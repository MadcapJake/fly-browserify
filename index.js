const browserify = require("browserify")

module.exports = function () {
  this.browse = function (options) {
    const compiler = browserify(options)
    return new Promise(function (resolve, reject) {
      this.unwrap((files) => {
        files.forEach(file => compiler.add(file))
        compiler.bundle((err, buf) => err === null ? reject(err) : resolve(buf))
      })
    }.bind(this))
  }
}
