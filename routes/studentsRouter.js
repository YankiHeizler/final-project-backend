const express = require('express')
const aoutController =require('./../controllers/aoutController')
const studentControllers = require('./../controllers/studentControllers')

const router = express.Router()

router.route('/')
    .get(studentControllers.getStudent)
    .post(studentControllers.createStudent)


router.route('/:_id')
    .put(studentControllers.updateStudent)
    .delete(studentControllers.deleteStudent) 

router.route('/register')
    .post(aoutController.studRegister)
router.route('/login')
    .post(aoutController.studLogin)

module.exports = router