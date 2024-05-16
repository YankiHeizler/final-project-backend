const Student = require('./../models/studentModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getStudent = asyncHandler(async (req, res) => {
    const { filter } = req.query
    const student = await Student.find(filter)
    res.status(200).json({
        status:'success',
        student
    })
})

// exports.createStudent = asyncHandler(async(req, res) => {
//     const student  = req.body
//     const newStudent = await Student.create(student)
//     res.status(200).json({
//         status:'success',
//         newStudent
//     })
// })

exports.updateStudent = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const updatedDetails = req.body
    const updateStudent = await Student.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(200).json({
        status: 'success',
        updateStudent
    })
})

exports.deleteStudent = asyncHandler(async (req, res) =>  {
    const {_id} = req.params
    const deleteStudent = await Student.findByIdAndDelete(_id)
    res.status(200).json({
        status: 'duccess',
        deleteStudent
    })
})