const Languages = require('./../models/languageModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getLanguages = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const languages = await Languages.find(filter)
    res.status(200).json({
        status:'success',
        languages
    })
})

exports.createLanguages = asyncHandler(async(req, res) => {
    const languages  = req.body
    const newLanguages = await Languages.create(languages)
    res.status(200).json({
        status:'success',
        newLanguages
    })
})

exports.updateLanguages = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const updateLanguages = await Languages.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(200).json({
        status: 'success',
        updateLanguages
    })
})

exports.deleteLanguages = asyncHandler(async (req, res) =>  {
    const {_id} = req.params
    const deleteLanguages = await Languages.findByIdAndUpdate(_id)
    res.status(200).json({
        status: 'duccess',
        deleteLanguages
    })
})