const Lectors = require('./../models/lectorModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getLectors = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const lectors = await Lectors.find(filter)
    res.status(200).json({
        status:'success',
        lectors
    })
})

exports.createLectors = asyncHandler(async(req, res) => {
    const lectors  = req.body
    const newLectors = await Lectors.create(lectors)
    res.status(200).json({
        status:'success',
        newLectors
    })
})

exports.updateLectors = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const updatedDetails = req.body
    const updateLectors = await Lectors.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(200).json({
        status: 'success',
        updateLectors
    })
})

exports.deleteLectors = asyncHandler(async (req, res) =>  {
    const {_id} = req.params
    const deleteLectors = await Lectors.findByIdAndDelete(_id)
    res.status(200).json({
        status: 'duccess',
        deleteLectors
    })
})