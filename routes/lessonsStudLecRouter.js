const express = require('express')

const aoutController = require("./../controllers/aoutController")
const lessonsStudLecControllers = require('./../controllers/lessonsStudLecControllers')
const connectionStudLecControllers = require("./../controllers/connectionStudLecControllers")


const router = express.Router()

router.route('/')
    .get(lessonsStudLecControllers.getLessonsStudLec);

router.route('/:connectionID')   //we need yo change controller to check stud ID
    .post(
        aoutController.protect, 
        lessonsStudLecControllers.createLessonsStudLec,
        connectionStudLecControllers.addLesson
    )

router.route('/:_id')
    .put(lessonsStudLecControllers.updateLessonsStudLec)

router.route('/messages/:_id')
    .put(lessonsStudLecControllers.updateLessonsMessages)
    

router.route('/:_id')
    .delete(aoutController.protect, lessonsStudLecControllers.deleteLessonsStudLec)



    module.exports = router