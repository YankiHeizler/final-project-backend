const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const lectorSchema = new mongoose.Schema({
    lecFName: {
        type: String,
        required: [true, "lecFName is requred"]
    },
    lecLName: {
        type: String,
        required: [true, "lecLName is requred"]
    },
    lecTZ: {
        type: String, 
        required: [true, "lecTZ is requred"], 
        unique: true
    },
    lecFoto: String, 
    lecSex: {
        type: String, 
        enum: ['זכר', 'נקבה'], 
        required: [true, "lecSex is requred"]
    },
    lecStudyLevels:{
        type:[{
            type:String, 
            enum:['בסיסית','ביניים','מתקדמת']
        }], 
            default:['בסיסית','ביניים','מתקדמת'],
            required: [true, "lecStudyLevels is requred"]
    },
    lecBirthDate: {
        type: Date,
        required: [true, "lecBirthDate is requred"]
    },
    lecStartIntDate: {
        type: Date,
        required: [true, "lecStartIntDate is requred"]
    },
    lecRate: {
        type: Number,
        required: [true, "lecRate is requred"]
    },
    lecEduc: {
        type:[{
            type:String, 
            enum:['ללא תואר','קורסים','סטודנט של האוניברסיטה','תואר ראשון','תואר שני','דוֹקטוֹרָט']
        }],
            required: [true, "lecEduc is requred"]
    },
    lecLangs: {
        type:[{
            type:String,
            enum:['שוודית','סומלית','סינית','רוסית','עברית','אנגלית']
        }],
            required: [true, "lecLangs is requred"]
    },
    lecWaysStudy: {
        type:[{
            type:String,
            enum:['וואטסאפ','טלגרם','זום','טלפון','פרונטלי','אחרת']
        }],
            default:'זום',
            required: [true, "lecWaysStudy is requred"]
    },
    lecMotherLang: {
        type:String,
        enum:['שוודית','סומלית','סינית','רוסית','עברית','אנגלית'],
        required: [true, "lecLangs is requred"]
    },
    lecPass:{
        type: String,
        required:[true, 'Must be a password'],
        minLength: 8,
        select: false
    },
    lecEmail: {
        type: String,
        required: [true, 'Must be a Email'],
        unique: true,   
    },
    lecPhone: {
        type: String,
        required: [true, "lecPhone is requred"]
    },
    lecTimeTable: {type:[{
            day:{
                type:Number,
                enum:[1,2,3,4,5],
                required: [true, "day is requred"] //requred doesn't work now
            },
            workinghours:[{
                type:String,
                enum:['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00',
                        '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
                required: [true, "workinghours is requred"] //requred doesn't work now
            }]
        }], 
        required: [true, "lecTimeTable is requred"]} //requred doesn't work now
      
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