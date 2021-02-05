const examplePlugin = require("./.engineer/plugins/example.plugin");

const main = async ()=>{

  let config = {
    "data" : require('./.engineer/data.json'),
    "fileTemplates" : [
      {
        "src" : "./.engineer/files/code.js",
        "dest" : "./src/index.js"
      },
      // {
      //   "src" : "./.engineer/files/module.js",
      //   "dest" : "./src/[id]/[id].module.js",
      //   "key" : "model",
      //   "if" : (model)=>{
      //     return model.code
      //   }
      // },
      // {
      //   "src" : "./.engineer/files/other.js",
      //   "dest" : "./src/[id]/[id].other.js",
      //   "key" : "model",
      //   "if" : (model)=>{
      //     return model.other
      //   }
      // }
    ]
  }

  config = await examplePlugin(config)
  return config

}

module.exports = main()