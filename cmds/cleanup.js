const {cleanup} = require("@satelite/engineer")

module.exports = (args) => {
  cleanup(process.cwd())
}