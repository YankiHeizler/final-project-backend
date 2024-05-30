const express = require("express");

const aoutController = require("./../controllers/aoutController")
const studentLessTimeTableControllers = require("./../controllers/studentLessTimeTableControllers");

const router = express.Router();

router.route('/:connectionID')
    .get(aoutController.protect, studentLessTimeTableControllers.getLessStudentTimeTable);

module.exports = router
