const express = require("express");

const aoutController = require("./../controllers/aoutController")
const studentLessTimeTableControllers = require("./../controllers/studentLessTimeTableControllers");

const router = express.Router();

router.route('/:connectionID') //connectionID is _id of MongoDB for connection, we get it after click on connection in screen befor
    .get(aoutController.protect, studentLessTimeTableControllers.getLessStudentTimeTable);

module.exports = router
