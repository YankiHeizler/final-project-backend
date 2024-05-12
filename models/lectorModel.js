const mongoose = require('mongoose')

const lectorSchema = new mongoose.Schema({
    lecFName: String,
    lecLName: String,
    lecTZ: String,
    lecFoto: String, 
    lecSex: {type: String, enum: ['ז', 'נ']},
    lecStudyLevels:{type:[{type:String, enum:['בסיסית','ביניים','מתקדמת']}], default:['בסיסית','ביניים','מתקדמת']},
    lecBirthDate: Date,
    lecStartIntDate: Date,
    lecRate: Number,
    lecEduc: {type:[{type:String, enum:['קורסים','סטודנט של האוניברסיטה','תואר ראשון','תואר שני','דוֹקטוֹרָט']}]},
    lecLangs: [{type: mongoose.Schema.ObjectId, ref: 'Language'}],
    lecWaysStudy: {type:[{type:String, enum:['וואטסאפ','טלגרם','זום','טלפון','פרונטלי','אחרת']}],default:'זום'},
    lecMotherLang: {type: mongoose.Schema.ObjectId, ref: 'Language'},
    lecLogin: String,
    lecPass: String
})

const Lector = mongoose.model('Lector', lectorSchema)

module.exports = Lector