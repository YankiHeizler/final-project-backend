const express = require('express')

const aoutController = require("./../controllers/aoutController")
const lessonsStudLecControllers = require('./../controllers/lessonsStudLecControllers')
const connectionStudLecControllers = require("./../controllers/connectionStudLecControllers")


const router = express.Router()

router.route('/')
    .get(lessonsStudLecControllers.getLessonsStudLec);

router.route('/:connectionID')   
    .post(
        aoutController.protect, 
        lessonsStudLecControllers.createLessonsStudLec,
        connectionStudLecControllers.updateConnectionStudLec
    )

router.route('/:_id')
    .put(lessonsStudLecControllers.updateStudent)
    .delete(lessonsStudLecControllers.deleteLessonsStudLec)

module.exports = router