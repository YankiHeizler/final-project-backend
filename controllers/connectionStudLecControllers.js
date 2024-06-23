const ConnectionStudLec = require("./../models/connectionStudLecModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const AppError = require('./../AppError')

exports.getConnectionStudLec = asyncHandler(async (req, res) => {
    
    const ID = req.id //ID of lector or student
   
    const connectionStudLec = await ConnectionStudLec.find({studID: ID})
        .populate('connLang connLessons connBooks lecID studID').select("-__v");
    
    if (connectionStudLec.studID!=undefined) {
       res.status(200).json({
        status: 'success',
        connectionStudLec
        }) 
    }
    else {
    const connectionStudLec = await ConnectionStudLec.find({ lecID: ID} )
        .populate('connLang connLessons connBooks lecID studID').select("-__v")
        res.status(200).json({
            status: 'success',
            connectionStudLec
            }) 
    }
         
})
exports.createConnectionStudLec = asyncHandler(async (req, res, next) => {
    const connLang = req.body.userDetails.connLang;
    const studID = req.id;
    const lecID = req.body.userDetails.lecID;

    const  userDetails  = {connLang,studID,lecID}

    const connection = await ConnectionStudLec.findOne({
        studID: userDetails.studID,
        lecID: userDetails.lecID,
        connLang: userDetails.connLang
    });
    

    if (connection) {
        return next(new AppError(403, "connectionStudLec already in the database"));
    }
    if (req.isStudent === false) {
        console.log('go away teacher');
    }
    const newConnectionStudLec = await ConnectionStudLec.create(
        userDetails
    );
    console.log('b');
    res.status(200).json({
        status: "success",
        newConnectionStudLec,
    });
});

exports.updateConnectionStudLec = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const updatedDetails = req.body;
    const updateConnectionStudLec = await ConnectionStudLec.findByIdAndUpdate(
        _id,
        updatedDetails,
        { new: true }
    );
    res.status(200).json({
        status: "success",
        updateConnectionStudLec,
    });
});

exports.addLesson = asyncHandler(async (req, res) => {
    
    const id = req.params.connectionID
    const newLessID = req.newLessID
    

    const updateConnectionStudLec = await ConnectionStudLec.findByIdAndUpdate(
        { _id: id },
        { $push: { connLessons: newLessID } },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        updateConnectionStudLec
    });
    
});


exports.deleteConnectionStudLec = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const deleteConnectionStudLec = await ConnectionStudLec.findByIdAndDelete(
        _id
    );
    res.status(200).json({
        status: "success",
        deleteConnectionStudLec,
    });
});
