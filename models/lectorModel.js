const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const lectorSchema = new mongoose.Schema({
    // lecFName: String,
    // lecLName: String,
    // lecTZ: String,
    // lecFoto: String, 
    // lecSex: {type: String, enum: ['ז', 'נ']},
    // lecStudyLevels:{type:[{type:String, enum:['בסיסית','ביניים','מתקדמת']}], default:['בסיסית','ביניים','מתקדמת']},
    // lecBirthDate: Date,
    // lecStartIntDate: Date,
    // lecRate: Number,
    // lecEduc: {type:[{type:String, enum:['קורסים','סטודנט של האוניברסיטה','תואר ראשון','תואר שני','דוֹקטוֹרָט']}]},
    // lecLangs: [{type: mongoose.Schema.ObjectId, ref: 'Language'}],
    // lecWaysStudy: {type:[{type:String, enum:['וואטסאפ','טלגרם','זום','טלפון','פרונטלי','אחרת']}],default:'זום'},
    // lecMotherLang: {type: mongoose.Schema.ObjectId, ref: 'Language'},
    // lecLogin: String,
    lecPass: String,
    lecEmail: String
})


lectorSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    return next()
    const salt = await bcrypt.genSalt(12)
    this.lecPass = await bcrypt.hash(this.lecPass, salt)
    next()
})
lectorSchema.methods.checkPassword = async function(password, hashedPassword){
    const checkPasword = await bcrypt.compare(password, hashedPassword)
    return checkPasword
}


const Lector = mongoose.model('Lector', lectorSchema)

module.exports = Lector