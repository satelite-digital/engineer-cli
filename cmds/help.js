const menus = {
  main: `
    outside [command] <options>

    init  .............. create project config file
    add  .............. add starter project using templates
    studio .............. start engineer studio to register and customize project
    build .............. use customization and template to build project
    version ............ show package version
    help ............... show help menu for a command`,

    init: `
    engineer init

    --template, -t ..... an example flag`,
    add: `
    engineer add svelte-spa-template node-rest-template svelte-pwa-template

    --template, -t ..... an example flag`,
    studio: `
    engineer studio
    
    No options available`,
    build: `
    engineer build

    --template, -t ..... an example flag`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}