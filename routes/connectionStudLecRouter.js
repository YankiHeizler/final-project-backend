const express = require("express");

const aoutController = require("./../controllers/aoutController")
const connectionStudLecControllers = require("./../controllers/connectionStudLecControllers");

const router = express.Router();

router
  .route("/")
  .get(connectionStudLecControllers.getConnectionStudLec)
  .post(aoutController.protect, connectionStudLecControllers.createConnectionStudLec); //aoutController.protect,

router
  .route("/:_id")
  .put(aoutController.protect, connectionStudLecControllers.updateConnectionStudLec) //aoutController.protect,
  .delete(connectionStudLecControllers.deleteConnectionStudLec);

module.exports = router;
