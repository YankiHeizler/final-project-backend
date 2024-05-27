const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, "bookName is requred"]
    },
    bookLink: {
        type: String,
        required: [true, "bookLink is requred"]
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book