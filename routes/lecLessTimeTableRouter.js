const express = require("express");

const aoutController = require("./../controllers/aoutController")
const lecLessTimeTableControllers = require("./../controllers/lecLessTimeTableControllers");

const router = express.Router();

console.log('i m here')

router.route('/:connectionID/:UserFirstDate') //connectionID is _id of MongoDB for connection, we get it after click on connection in screen befor
    .get(aoutController.protect, lecLessTimeTableControllers.getLessLecTimeTable);
    

module.exports = router

