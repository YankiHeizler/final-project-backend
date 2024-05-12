const mongoose = require('mongoose')

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

const Student = mongoose.model('Student', studentSchema)

module.exports = Student