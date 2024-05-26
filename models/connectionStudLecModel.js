const mongoose = require('mongoose')

const ConnectionStudLecSchema = new mongoose.Schema({
    studID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, "studID is requred"], 
        unique: true
    },
    lecID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Lector', 
        required: [true, "lecID is requred"], 
        unique: true
    },
    connLang: {
        type:String,
        enum:['שוודית','סומלית','סינית','רוסית','עברית','אנגלית'], 
        required: [true, "connLang is requred"]
    },
    connLessons: [{
        type: mongoose.Schema.ObjectId,
        ref: 'LessonStudLec'
    }],
    connBooks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }]
})

const ConnectionStudLec = mongoose.model('ConnectionStudLec', ConnectionStudLecSchema)

module.exports = ConnectionStudLec