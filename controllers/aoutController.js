const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const AppError = require('./../AppError')
const {promisify} = require('util')
const Student = require('./../models/studentModel')
const Lector = require('../models/lectorModel')

const nodemailer = require('nodemailer');
const sendEmail = require('./../send_Email')

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: "3h"
    });
  };
  
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure : true
    }
    
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
      status: 'success',
      token
      });
   };

exports.studRegister = asyncHandler(async(req, res, next)=>{
    const {studEmail, studPass} = req.body.userDetails
    if (!studEmail ||!studPass)
     return next(new AppError(403,'Request details are missing'))
    
    const st = await Student.findOne({studEmail})
    if (st)
     return next(new AppError(403,'student already in the database'))

    const newStudent = await Student.create(req.body.userDetails)
    createSendToken(newStudent, 201 , res)

  })
  
exports.studLogin = asyncHandler(async (req, res, next)=>{
    const {studEmail, studPass} = req.body.userDetails
    if(!studEmail || !studPass) 
      return next(new AppError(403, 'Email or password is missing1'))
        
    const st = await Student.findOne({studEmail}).select('+studPass')
    if (! st || !await  st.checkPassword(studPass, st.studPass) )
        return next(new AppError(403, 'Email or password is not correct '))

    createSendToken(st, 201 , res) 
  })

exports.lecLogin = asyncHandler(async (req, res, next)=>{
    const {lecEmail, lecPass} = req.body.userDetails
    if(! lecEmail || ! lecPass) 
      return next(new AppError(403, 'Email or password is missing1'))

    const lec = await Lector.findOne({lecEmail}).select('+lecPass')
    if (! lec || !await  lec.checkPassword(lecPass, lec.lecPass) )
      return next(new AppError(403, 'Email or password is not correct '))

    createSendToken(lec, 201 , res) 
  })


exports.lecRegister = asyncHandler(async(req, res, next)=>{
    const {lecEmail, lecPass} = req.body.userDetails
    if (!lecEmail ||!lecPass)
     return next(new AppError(403,'Request details are missing'))
    
    const lec = await Lector.findOne({lecEmail})
    if (lec)
      return next(new AppError(403,'lector already in the database'))

    const newLector = await Lector.create(req.body.userDetails);
    createSendToken(newLector, 201 , res)

    await sendEmail({
      to: lecEmail,
      subject: 'Welcome to Our Website',
      text: '',
      html: `<h1>Welcome lector ${lecNema}</h1><p>Thank you for registering to LearnLink!</p>`
      })

})

exports.protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.cookie.split('=')[1]
  if (!token) return next(new AppError(403, 'Please login '))
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  if (!decoded) return next(new AppError(403, 'Please login '))
  const {id} = decoded
  let user = await Lector.findById(id)
  if (!user) 
    user = await Student.findById(id)
  if (!user)
    return next(new AppError(400, 'Please register'))
  req.user = user
  if (user.studLogin)
    req.isStudned = true;
  else
    req.isStudned = false;

  if (req.isStudned)
    console.log('hello student');
  else
    console.log('bad teacher');
  res.id = id
  next()
})