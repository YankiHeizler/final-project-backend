const express = require('express')

const languagesControllers = require('./../controllers/languagesControllers')

const router = express.Router()



router.route('/')
    .get(languagesControllers.getLanguages)
    .post(languagesControllers.createLanguages)
    
router.route('/:_id')
    .put(languagesControllers.updateLanguages)
    .delete(languagesControllers.deleteLanguages)

module.exports = router