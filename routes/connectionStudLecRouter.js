const express = require("express");

const aoutController = require("./../controllers/aoutController")
const connectionStudLecControllers = require("./../controllers/connectionStudLecControllers");

const router = express.Router();

router
  .route("/")
  .get(aoutController.protect, connectionStudLecControllers.getConnectionStudLec)
  .post(aoutController.protect, connectionStudLecControllers.createConnectionStudLec); 

router
  .route("/:_id")
  .put(aoutController.protect, connectionStudLecControllers.updateConnectionStudLec) 
  .delete(connectionStudLecControllers.deleteConnectionStudLec);

module.exports = router;
