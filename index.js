const browserify = require("browserify")

function compile(compiler, cb) {
  return this.unwrap((files) => {
    files.forEach(file => compiler.add(file))
    compiler.bundle(function (err, buf) {
      if (err) {
        return this.emit("plugin_error", {
          plugin: "fly-browserify",
          error: getError(err.message, this.root)
        })
      }

      cb(null, buf.toString())
    })
  })
}

function getError(msg, basedir) {
  return msg.replace(RegExp(basedir, "g"), "")
    .replace(": ", ": \n\n  ")
    .replace(" while parsing", "\n\nwhile parsing") + "\n"
}

module.exports = function() {
  this.filter("browserify", (source, options) => {
    const b = browserify(options)
    return this.defer(compile.bind(this))(b)
  })
}
