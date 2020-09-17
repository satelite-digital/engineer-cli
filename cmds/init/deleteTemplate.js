const fs = require('fs-jetpack')
const ora = require('ora');



const deleteTemplate = async (template, spinner = ora('Eliminando plantilla').start())=>{

  
     const result = await fs.removeAsync(`${__dirname}/templates/${template}`)
     spinner.stop();
     return result
      
 


  }

  module.exports = deleteTemplate