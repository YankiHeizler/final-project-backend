const express = require('express')
const studentTimeTableControllers = require('../controllers/studentTimeTableControllers')
const router = express.Router()

    
router.route('/')
    .get(studentTimeTableControllers.getStudentTimeTable)

module.exports = router