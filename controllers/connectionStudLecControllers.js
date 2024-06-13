const ConnectionStudLec = require("./../models/connectionStudLecModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const AppError = require('./../AppError')

exports.getConnectionStudLec = asyncHandler(async (req, res) => {
  const filter = req.query;
  const connectionStudLec = await ConnectionStudLec.find(filter)
    .populate("connLang connLessons connBooks")
    .select("-__v");
  res.status(200).json({
    status: "success",
    connectionStudLec,
  });
});

exports.createConnectionStudLec = asyncHandler(async (req, res, next) => {
  const connLang = req.body.userDetails.connLang;
  const studID = req.body.userDetails.studID;
  const lecID = req.body.userDetails.lecID;

  const connection = await ConnectionStudLec.findOne({
    studID, lecID, connLang
  });
  if (connection) {
    return next(new AppError(403, "connectionStudLec already in the database"));
  }
  if (req.isStudent === false){
    console.log('go away teacher');
  }
  const newConnectionStudLec = await ConnectionStudLec.create(
    {connectionStudLec: req.body}
  );
  res.status(200).json({
    status: "success",
    newConnectionStudLe
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

exports.deleteConnectionStudLec = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const deleteConnectionStudLec = await ConnectionStudLec.findByIdAndDelete(
    _id
  );
  res.status(200).json({
    status: "duccess",
    deleteConnectionStudLec,
  });
});
