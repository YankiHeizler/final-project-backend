const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const studentSchema = new mongoose.Schema({
    studFName: String,
    studLName: String,
    studTZ: String,
    studFoto: String,
    studBirthDate: Date,
    studPhone: String,
    studEmail: {
        type:String,
        required: true,
    },
    studLogin: String,
    studPass:{
        type: String,
        required:[true, 'Must be a password'],
        minLength: 8,
        select: false
    }})


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