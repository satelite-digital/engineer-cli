const pkg = require('../package.json')
const updateNotifier = require('update-notifier')
const boxen = require('boxen');
const chalk = require('chalk');

function checkVersion() {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 0 });

  if (notifier.update) {
    notifier.notify();
  }else{
    console.log(
      boxen(
        chalk.yellow(`v${pkg.version} - ${chalk.magenta('No upgrade needed')}`),
          { padding : 2 }
        )
    )
  }
}

module.exports = (args) => {
  checkVersion();
}

