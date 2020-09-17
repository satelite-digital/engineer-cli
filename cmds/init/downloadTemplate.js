var ghdownload = require('github-download')


const ora = require('ora');



const downloadTemplate = async (user, repo, spinner = ora('Descargando plantilla').start())=>{

    return new Promise(function(resolve, reject){
       
  return ghdownload({user: user, repo : repo, ref: 'master'}, `${__dirname}/templates/${repo}`)
.on('dir', function(dir) {
  console.log(dir)
})
.on('file', function(file) {
  console.log(file)
})
.on('zip', function(zipUrl) { //only emitted if Github API limit is reached and the zip file is downloaded
  console.log(zipUrl)
})
.on('error', function(err) {
  console.error(err)
})
.on('end', function() {
  spinner = spinner.stop()
  resolve(true);
})

    });
 


  }

  module.exports = downloadTemplate