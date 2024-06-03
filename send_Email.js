const nodemailer = require('nodemailer');
require('dotenv').config(); // ייבוא הספריית dotenv לקריאת המשתנים מקובץ .env

// הגדרת הטרנספורטר לשליחת מיילים
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL, // שם המשתמש למייל
        pass: process.env.NODEMAILER_PASS  // סיסמת המשתמש למייל
    },
    tls: {
        rejectUnauthorized: false
    }
    
    });
// פונקציה לשליחת מיילים
async function sendEmail({ to, subject, text, html }) {
try {
    // הגדרת האפשרויות לשליחת המייל
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL, // המייל ממנו ישלח המייל
        to,                                  // כתובת המייל שאליה ישלח המייל
        subject,                             // נושא המייל
        text,                                // טקסט המייל
        html                                 // HTML של המייל
    };

    // שליחת המייל והמתנה לתגובה
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return info; // החזרת המידע על המייל שנשלח
} catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Error sending email');
}
}

module.exports = sendEmail; // ייצוא הפונקציה לשימוש במקומות אחרים באפליקציה



// exports.register = asyncHandler(async(req, res, next) => {
 
//     const {email, password,role,name} = req.body.userDetails
//     // const isStudent = req.body.isStudent
//     // console.log(isStudent)
//     if (!email ||!password)
//    return next(new AppError(403,'Request details are missing'))
  
//   // if (isStudent)
//   //   {
//       const user1 = await user.find({email})
//       if (user1.length > 1)
//         {

//           return next(new AppError(403,'user already register as teacher and as student'))
//         }
//       if (user1.length == 1 && user1[0].role === role)
//         {
//           return next(new AppError(403,'user already register with the same role'))
//         }
//         console.log('e')
//         const newUser = await user.create(req.body.userDetails)
//           // שליחת מייל אישור רישום
//     await sendEmail({
//       to: '',
//       to: email,
//       subject: 'Welcome to Our Website',
//       // text: ${role, name}, thank you for registering to LearnLink!,
//       html: <h1>Welcome ${role} ${name}</h1><p>Thank you for registering to LearnLink!</p>

//       });