const menus = {
  main: `
    outside [command] <options>

    init  .............. initialize or create project using a template 
    studio .............. start engineer studio to register and customize project
    build .............. use customization and template to build project
    version ............ show package version
    help ............... show help menu for a command`,

    init: `
    engineer init`
          ,
    studio: `
    engineer studio`,
    build: `
    engineer build`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}