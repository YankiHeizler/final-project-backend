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
    studPass: String
})


studentSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    return next()
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
studentSchema.methods.checkPassword = async function(password,hashedPassword){
    console.log(hashedPassword)
    const checkPasword = await bcrypt.compare(password, hashedPassword)
    return checkPasword
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student