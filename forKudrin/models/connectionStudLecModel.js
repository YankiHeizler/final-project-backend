const mongoose = require('mongoose')

const ConnectionStudLecSchema = new mongoose.Schema({
    studID: {type: mongoose.Schema.ObjectId, ref: 'Student'},
    lecID:  {type: mongoose.Schema.ObjectId, ref: 'Lector'},
    connStudyLevels: {type:{type:String, enum:['בסיסית','ביניים','מתקדמת']},},
    connLang: {type: mongoose.Schema.ObjectId, ref: 'Language'},
    connDate: Date,
    connWaysStudy: {type:[{type:String, enum:['קורסים','סטודנט של האוניברסיטה','תואר ראשון','תואר שני','דוֹקטוֹרָט']}]},
    connLessons: [{type: mongoose.Schema.ObjectId, ref: 'LessonStudLec'}],
    connBooks: [{type: mongoose.Schema.ObjectId, ref: 'Book'}]
})

const ConnectionStudLec = mongoose.model('ConnectionStudLec', ConnectionStudLecSchema)

module.exports = ConnectionStudLec