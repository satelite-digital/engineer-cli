// var ghdownload = require('github-download');

const path = require('path');
const{ execSync } = require('child_process');

const fs = require('fs-jetpack')

const ora = require('ora');
const { resolve } = require('path');



const downloadTemplate = async (user, repo, spinner = ora('Descargando plantilla').start())=>{
  
  return new Promise(async (resolve, reject) =>{
    

      execSync(`git clone https://github.com/${user}/${repo}`, {
        stdio: [0, 1, 2], // we need this so node will print the command output
        cwd: path.resolve(`${__dirname}/templates`, ''), // path to where you want to save the file
      })  

      const result = await fs.removeAsync(`${__dirname}/templates/${repo}/.git`)



      spinner.stop()
      
      resolve()
      
    });


  }

  module.exports = downloadTemplate