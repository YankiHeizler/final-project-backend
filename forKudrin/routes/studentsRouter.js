const express = require('express')

const studentControllers = require('./../controllers/studentControllers')

const router = express.Router()

router.route('/')
    .get(studentControllers.getStudent)
    .post(studentControllers.createStudent)


router.route('/:_id')
    .put(studentControllers.updateStudent)
    .delete(studentControllers.deleteStudent) 

module.exports = router