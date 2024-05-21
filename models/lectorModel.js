const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const lectorSchema = new mongoose.Schema({
    lecFName: String,
    lecLName: String,
    lecTZ: String,
    lecFoto: String, 
    lecSex: {type: String, enum: ['זכר', 'נקבה']},
    lecStudyLevels:{type:[{type:String, enum:['בסיסית','ביניים','מתקדמת']}], default:['בסיסית','ביניים','מתקדמת']},
    lecBirthDate: Date,
    lecStartIntDate: Date,
    lecRate: Number,
    lecEduc: {type:[{type:String, enum:['ללא תואר','קורסים','סטודנט של האוניברסיטה','תואר ראשון','תואר שני','דוֹקטוֹרָט']}]},
    lecLangs: {type:[{type:String, enum:['שוודית','סומלית','סינית','רוסית','עברית','אנגלית']}]},
    lecWaysStudy: {type:[{type:String, enum:['וואטסאפ','טלגרם','זום','טלפון','פרונטלי','אחרת']}],default:'זום'},
    lecMotherLang: {type:String, enum:['שוודית','סומלית','סינית','רוסית','עברית','אנגלית']},
    lecLogin: String,
    lecPass:{
        type: String,
        required:[true, 'Must be a password'],
        minLength: 8,
        select: false
    },
    lecEmail: {
        type:String,
        required: true,
    },
    lecPhone: String,
    lecTimeTable: {type:
        [{
        day:{type:Number,enum:[1,2,3,4,5]},
        workinghours:[{type:String,enum:['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']}]
        }]
    } 
    
})


lectorSchema.pre('save', async function(next){
    if(!this.isModified('lecPass'))
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