const fs = require("fs-extra")

module.exports.version = function() {
  const out = fs.readJsonSync(__dirname + "/package.json")
  return out.version.replace(/\./g, "-")
}
