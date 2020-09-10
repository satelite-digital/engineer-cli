const inquirer = require("inquirer")
const fs = require("fs")
const createDirectoryContents = require("./createDirectoryContents")

const CURR_DIR = process.cwd();
const CHOICES = [ "Current project", ...fs.readdirSync(`${__dirname}/templates`) ]; 



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
  .then(answers => {
    
    
    let projectChoice;
    let projectName = false;
    if(answers['project-choice'] == 'Current project'){
      projectChoice = 'init';
      projectName = false;
      const templatePath = `${__dirname}/templates/${projectChoice}`;
      if(projectName){
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);
      }
  
      createDirectoryContents(templatePath, projectName);
    }else{
      projectChoice = answers['project-choice']
      inquirer.prompt([NAME_QUESTION]).then(answers => {
        projectName = answers['project-name']
        const templatePath = `${__dirname}/templates/${projectChoice}`;
        if(projectName){
          fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        }
    
        createDirectoryContents(templatePath, projectName);
      })
    }
  
    

  });
}