const LessonsStudLec = require('./../models/lessonStudLecModel')
const ConnectionStudLec = require("./../models/connectionStudLecModel");

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

exports.createLessonsStudLec = asyncHandler(async(req, res, next) => {
    
    const lessDate  = req.body.lessDate 
    const lessTime = req.body.lessTime
    const lessMessage = req.body.lessMessage
    
    
    const newLessonsStudLec = await LessonsStudLec.create({lessDate, lessTime, lessMessage})

    req.newLessID = newLessonsStudLec._id

    // res.status(200).json({
    //     status:'success',
    //     newLessonsStudLec,
    //     newLessID
    // })
    
    
    next()
})

exports.updateLessonsStudLec = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const updatedDetails = req.body
    const updateLessonsStudLec = await LessonsStudLec.findByIdAndUpdate(_id, updatedDetails, {new: true})
    res.status(200).json({
        status: 'success',
        updateLessonsStudLec
    })
})

exports.updateLessonsMessages = asyncHandler (async (req, res) => {
    const {_id} = req.params
    const newMessage = req.body.lessMessage
    const existingMessages = await LessonsStudLec.findById(_id)
          .then(doc => doc.lessMessage);
    const updatedMessages = [...existingMessages, newMessage]
    
    const updateLessonsMessages = await LessonsStudLec.findByIdAndUpdate(
        _id, 
        {lessMessage:updatedMessages}, 
        {new: true}
    )
    res.status(200).json({
        status: 'success',
        updateLessonsMessages
    })
})

exports.deleteLessonsStudLec = asyncHandler(async (req, res) =>  {
    console.log('start del less')
    const {_id} = req.params
    console.log(_id)
    const deleteLessonsStudLec = await LessonsStudLec.findByIdAndDelete(_id)
    console.log(_id)

    // for (let i = 0; i < ConnectionStudLec.length; i++) {
    //     for (let j = 0; j < ConnectionStudLec[i].connLessons.length; j++) {
    //         if (ConnectionStudLec[i].connLessons[j]==_id) {
    //             const index = ConnectionStudLec[i].connLessons.indexOf(ConnectionStudLec[i].connLessons[j])
    //             ConnectionStudLec[i].connLessons.splice(index, 1)
    //         } 
    //     }
    // }

    res.status(200).json({
        status: 'success',
        deleteLessonsStudLec
    })
})