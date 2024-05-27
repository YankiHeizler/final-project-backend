const LessonsStudLec = require('./../models/lessonStudLecModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getLessonsStudLec = asyncHandler(async (req, res) => {
    const  filter  = req.query
    const lessonsStudLec = await LessonsStudLec.find(filter)
    res.status(200).json({
        status:'success',
        lessonsStudLec
    })
})

exports.createLessonsStudLec = asyncHandler(async(req, res) => {
    const lessonsStudLec  = req.body
    console.log(lessonsStudLec);
    const newLessonsStudLec = await LessonsStudLec.create(lessonsStudLec)
    res.status(200).json({
        status:'success',
        newLessonsStudLec
    })
})

exports.updateStudent = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const updatedDetails = req.body
    const updateLessonsStudLec = await LessonsStudLec.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(200).json({
        status: 'success',
        updateLessonsStudLec
    })
})

exports.deleteLessonsStudLec = asyncHandler(async (req, res) =>  {
    const {_id} = req.params
    const deleteLessonsStudLec = await LessonsStudLec.findByIdAndDelete(_id)
    res.status(200).json({
        status: 'duccess',
        deleteLessonsStudLec
    })
})