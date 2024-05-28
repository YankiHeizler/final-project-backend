const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const studentSchema = new mongoose.Schema({
    studFName: {
        type: String,
        required: [true, "studFName is requred"]
    },
    studLName: {
        type: String,
        required: [true, "studLName is requred"]
    },
    studTZ: {
        type: String, 
        required: [true, "studTZ is requred"], 
        unique: true},
    studFoto: String,
    
    studBirthDate: {
        type: Date,
        required: [true, "lecBirthDate is requred"]
    },
    studPhone: {
        type: String,
        required: [true, "lecPhone is requred"]
    },
    studEmail: {
        type: String,
        required: [true, 'Must be a Email'],
        unique: true,   
    },
    studPass:{
        type: String,
        required:[true, 'Must be a password'],
        minLength: 8,
        select: false
    }
})


studentSchema.pre('save', async function(next){
    if(!this.isModified('studPass'))
    return next()
    const salt = await bcrypt.genSalt(12)
    this.studPass = await bcrypt.hash(this.studPass, salt)
    next()
})
studentSchema.methods.checkPassword = async function(password,hashedPassword){
    const checkPasword = await bcrypt.compare(password, hashedPassword)
    return checkPasword
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student