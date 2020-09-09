const ora = require('ora')

module.exports = (args) => {
  const spinner = ora().start()
  setTimeout(function(){
    spinner.stop()
  }, 5000)
}