const express = require('express')

const studentTimeTableControllers = require('../controllers/studentTimeTableControllers')
const aoutController = require("./../controllers/aoutController")

const router = express.Router()

    
router.route('/')
    .get(aoutController.protect, studentTimeTableControllers.getStudentTimeTable); 

module.exports = router