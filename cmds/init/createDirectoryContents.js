const fs = require('fs')
const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath)=>{
  
    const filesToCreate = fs.readdirSync(templatePath);
  
    filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;
      
      // get stats about the current file
      const stats = fs.statSync(origFilePath);
  
      if (stats.isFile()) {
        const contents = fs.readFileSync(origFilePath, 'utf8');
        let writePath;
        if(newProjectPath){
          writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        }else{
          writePath = `${CURR_DIR}/${file}`;
        }
        fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
        if(newProjectPath){
          fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
        }else{
          fs.mkdirSync(`${CURR_DIR}/${file}`);
        }
        
        // recursive call
        let _newProjectPath
        if(newProjectPath){
          _newProjectPath = `${newProjectPath}/${file}`
        }else{
          _newProjectPath = `${file}`
        }
        createDirectoryContents(`${templatePath}/${file}`, _newProjectPath);
      }
    });
  }

  module.exports = createDirectoryContents