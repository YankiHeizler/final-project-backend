const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    lang: String,
    langPres: String 
})

const Language = mongoose.model('Language', languageSchema)

module.exports = Language