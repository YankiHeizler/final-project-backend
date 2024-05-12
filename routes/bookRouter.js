const express = require('express')

const bookControllers = require('./../controllers/bookControllers')

const router = express.Router()

router.route('/')
    .get(bookControllers.getBook)
    .post(bookControllers.createBook)


router.route('/:_id')
    .put(bookControllers.updateBook)
    .delete(bookControllers.deleteBook) 

module.exports = router