const {cleanup} = require("@ericksatelite/engineer")

module.exports = (args) => {
  cleanup(process.cwd())
}