const ConnectionStudLec = require('./../models/connectionStudLecModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getConnectionStudLec = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const connectionStudLec = await ConnectionStudLec.find(filter)
    res.status(200).json({
        status:'success',
        connectionStudLec
    })
})

exports.createConnectionStudLec = asyncHandler(async(req, res) => {
    const connectionStudLec  = req.body
    const newConnectionStudLec = await ConnectionStudLec.create(connectionStudLec)
    res.status(200).json({
        status:'success',
        newConnectionStudLec
    })
})

exports.updateConnectionStudLec = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const updatedDetails = req.body
    const updateConnectionStudLec = await ConnectionStudLec.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(200).json({
        status: 'success',
        updateConnectionStudLec
    })
})

exports.deleteConnectionStudLec = asyncHandler(async (req, res) =>  {
    const {_id} = req.params
    const deleteConnectionStudLec = await ConnectionStudLec.findByIdAndDelete(_id)
    res.status(200).json({
        status: 'duccess',
        deleteConnectionStudLec
    })
})