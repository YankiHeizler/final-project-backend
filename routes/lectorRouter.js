const express = require('express')

const lectorsControllers = require('./../controllers/lectorsControllers')
const aoutController = require('./../controllers/aoutController')
const router = express.Router()

// const multer = require('multer')


router.route('/')
    .get(lectorsControllers.getLectors)
    .post(lectorsControllers.createLectors)
    
router.route('/:_id')
    .put(lectorsControllers.updateLectors)
    .delete(lectorsControllers.deleteLectors)

router.route('/register')
    .post(aoutController.lecRegister)
    
router.route('/login')
    .post(aoutController.lecLogin)


module.exports = router