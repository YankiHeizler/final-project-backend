const express = require('express')

const lecTimeTableControllers = require('../controllers/lecTimeTableControllers')
const aoutController = require("./../controllers/aoutController")

const router = express.Router()

    
router.route('/')
    .get(aoutController.protect, lecTimeTableControllers.getLecTimeTable); 

module.exports = router