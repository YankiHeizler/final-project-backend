const mongoose = require('mongoose')

const ConnectionStudLecSchema = new mongoose.Schema({
    studID: {type: mongoose.Schema.ObjectId, ref: 'Student'},
    lecID:  {type: mongoose.Schema.ObjectId, ref: 'Lector'},
    connStudyLevels: {type:{type:String, enum:['בסיסית','ביניים','מתקדמת']},},
    connLang: {type:String, enum:['שוודית','סומלית','סינית','רוסית','עברית','אנגלית']},
    connDate: Date,
    connWaysStudy: {type:[{type:String, enum:['וואטסאפ','טלגרם','זום','טלפון','פרונטלי','אחרת']}]},
    connLessons: [{type: mongoose.Schema.ObjectId, ref: 'LessonStudLec'}],
    connBooks: [{type: mongoose.Schema.ObjectId, ref: 'Book'}]
})

const ConnectionStudLec = mongoose.model('ConnectionStudLec', ConnectionStudLecSchema)

module.exports = ConnectionStudLec