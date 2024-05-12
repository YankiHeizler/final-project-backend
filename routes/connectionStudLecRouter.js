const express = require('express')

const connectionStudLecControllers = require('./../controllers/connectionStudLecControllers')

const router = express.Router()




router.route('/')
    .get(connectionStudLecControllers.getConnectionStudLec)
    .post(connectionStudLecControllers.createConnectionStudLec)
    
router.route('/:_id')
    .put(connectionStudLecControllers.updateConnectionStudLec)
    .delete(connectionStudLecControllers.deleteConnectionStudLec)

module.exports = router