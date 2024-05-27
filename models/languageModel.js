const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    lang: {
        type: String,
        required: [true, "lang is requred"],
        unique: true
    },
    langPres: {
        type: String,
        required: [true, "langPres is requred"],
        unique: true
    } 
})

const Language = mongoose.model('Language', languageSchema)

module.exports = Language