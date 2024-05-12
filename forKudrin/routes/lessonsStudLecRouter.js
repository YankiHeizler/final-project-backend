const express = require('express')

const lessonsStudLecControllers = require('./../controllers/lessonsStudLecControllers')

const router = express.Router()

router.route('/')
    .get(lessonsStudLecControllers.getLessonsStudLec)
    .post(lessonsStudLecControllers.createLessonsStudLec)

router.route('/:_id')
    .put(lessonsStudLecControllers.updateStudent)
    .delete(lessonsStudLecControllers.deleteLessonsStudLec)

module.exports = router