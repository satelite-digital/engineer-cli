const express = require('express')
 
const { folder_log }  = require('./../controllers')
const { createController, findManyController, findOneController, updateController, deleteController, countController } = folder_log
 
const router = express.Router()

const resource = 'folder_log'
 
router.get(`/${resource}/:id`, findOneController)
router.get(`/${resource}/`, findManyController)
router.post(`/${resource}`, createController)
router.put(`/${resource}/:id`, updateController) 
router.delete(`/${resource}/:id`, deleteController) 
router.get(`/${resource}Count`, countController) 

module.exports = router