const mongoose = require('mongoose')

const lessonStudLecSchema = new mongoose.Schema({
    lessDate: Date,
    lessTime: {type:{type:String, 
                    enum:['06:00',
                        '07:00',
                        '08:00',
                        '09:00',
                        '10:00',
                        '11:00',
                        '12:00',
                        '13:00',
                        '14:00',
                        '15:00',
                        '16:00',
                        '17:00',
                        '18:00',
                        '19:00',
                        '20:00',
                        '21:00']},},
    lessMessage: String
})

const LessonStudLec = mongoose.model('LessonStudLec', lessonStudLecSchema)

module.exports = LessonStudLec