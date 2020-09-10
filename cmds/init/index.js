const createDirectoryContents = require("./createDirectoryContents")

module.exports = (args) => {

    const projectChoice = 'init';
    const projectName = false;
    const templatePath = `${__dirname}/templates/${projectChoice}`;
  
    if(projectName){
      fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    }

    createDirectoryContents(templatePath, projectName);
}