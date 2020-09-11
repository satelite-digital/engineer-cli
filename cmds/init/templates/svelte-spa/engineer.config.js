const config = {
  "options" : {
    "model" : "./.engineer/schema.json"
  },
  "resources" : [
    // API Client
    {
      "src" : "./.engineer/files/client/index.js",
      "dest" : "./src/app/services/client/index.js"
    },
    {
      "src" : "./.engineer/files/client/entity.service.js",
      "dest" : "./src/app/services/client/[id].service.js",
      "key" : "model"
    },
    // Modules
    {
      "src" : "./.engineer/files/modules/index.js",
      "dest" : "./src/app/modules/index.js"
    },
    {
      "src" : "./.engineer/files/modules/entity/entity.module.js",
      "dest" : "./src/app/modules/[id]/[id].module.js",
      "key" : "model"
    },
    {
      "src" : "./.engineer/files/modules/entity/pages/list.page.svelte",
      "dest" : "./src/app/modules/[id]/pages/list.page.svelte",
      "key" : "model"
    },
      // Routes
      {
        "src" : "./.engineer/files/routes/index.js",
        "dest" : "./src/app/routes/index.js"
      },
      {
        "src" : "./.engineer/files/components/ModuleSidenav.svelte",
        "dest" : "./src/app/components/organisms/ModuleSidenav.svelte"
      }
  ]
}

module.exports = config