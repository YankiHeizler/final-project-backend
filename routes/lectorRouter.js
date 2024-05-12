const express = require('express')

const lectorsControllers = require('./../controllers/lectorsControllers')

const router = express.Router()


router.route('/')
    .get(lectorsControllers.getLectors)
    .post(lectorsControllers.createLectors)
    
router.route('/:_id')
    .put(lectorsControllers.updateLectors)
    .delete(lectorsControllers.deleteLectors)

module.exports = router