const inquirer = require("inquirer")
const fs = require("fs")
const ora = require("ora")
const boxen = require("boxen")
const chalk = require("chalk")
const createDirectoryContents = require("./createDirectoryContents")
const downloadTemplate = require("./downloadTemplate")
const deleteTemplate = require("./deleteTemplate")

const concat = function(strings){
  return strings.join()
}

const CURR_DIR = process.cwd();
// let TEMPLATES = fs.readdirSync(`${__dirname}/templates`)
let TEMPLATES = require(`${__dirname}/templates/index.js`)
// console.log('templates')
// TEMPLATES.splice(0, 1)
const CHOICES = [ "Initialize current project", ...TEMPLATES ]; 



const PROJECT_QUESTION = {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  }

const NAME_QUESTION = {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }



module.exports = (args) => {

  inquirer.prompt([PROJECT_QUESTION])
  .then(async (answers) => {
    
    
    let projectChoice;
    let projectName = false;
    if(answers['project-choice'] == 'Initialize current project'){
      projectChoice = 'engineer-init';
      projectName = false;

      const downloadedTemplate = await downloadTemplate(`satelite-digital`, `${projectChoice}`)
        console.log('downloadedTemplate',downloadedTemplate)
        const templatePath = `${__dirname}/templates/${projectChoice}`;
        if(projectName){
          fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        }
        
        const spinner = ora('Creating project...').start();
        await createDirectoryContents(templatePath, projectName, spinner);
        spinner.succeed("Contents created!");
        await deleteTemplate(projectChoice)
        spinner.succeed("Template deleted"); 
        console.log(boxen(`${chalk.yellowBright(projectName)} ( Made with: ${chalk.yellow(projectChoice)} template ) \n ${chalk.magenta(concat(["run cd ", projectName, " && engineer build"]).replace(/[,]/g,''))}`, { padding : 2, borderStyle : 'double' }))



      // const templatePath = `${process.cwd()}/_templates/${projectChoice}`;
      // if(projectName){
      //   fs.mkdirSync(`${CURR_DIR}/${projectName}`);
      // }
      
      // const spinner = ora('Creating project...').start();
      // await createDirectoryContents(templatePath, projectName, spinner);
      // spinner.succeed("Proyecto iniciado exitosamente");

    }else{
      projectChoice = answers['project-choice']
      inquirer.prompt([NAME_QUESTION]).then(async (answers) => {
        projectName = answers['project-name']
        
        const downloadedTemplate = await downloadTemplate(`satelite-digital`, `${projectChoice}`)
        console.log('downloadedTemplate',downloadedTemplate)
        const templatePath = `${__dirname}/templates/${projectChoice}`;
        if(projectName){
          fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        }
        
        const spinner = ora('Creating project...').start();
        await createDirectoryContents(templatePath, projectName, spinner);
        spinner.succeed("Contents created!");
        await deleteTemplate(projectChoice)
        spinner.succeed("Template deleted"); 
        console.log(boxen(`${chalk.yellowBright(projectName)} ( Made with: ${chalk.yellow(projectChoice)} template ) \n ${chalk.magenta(concat(["run cd ", projectName, " && engineer build"]).replace(/[,]/g,''))}`, { padding : 2, borderStyle : 'double' }))
      })
    }
  
    

  });
}