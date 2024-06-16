const express = require('express') //multer and not only
// const multer = require('multer') //multer
// const bodyParser = require('body-parser') //multer
const mongoose = require('mongoose'); //multer and not only

// const upload = multer({ dest: 'public/' }); //multer


const studentRouter = require('./routes/studentsRouter')
const lessonsStudLecRouter = require('./routes/lessonsStudLecRouter')
const lectorsRouter = require('./routes/lectorRouter')
const connectionStudLecRouter = require('./routes/connectionStudLecRouter')
const languagesRouter = require('./routes/languagesRouter')
const bookRouter = require('./routes/bookRouter')
const studentTimeTableRouter = require('./routes/studendTimeTableRouter')
const studentLessTimeTableRouter = require('./routes/studentLessTimeTableRouter')
const lecTimeTableRouter = require('./routes/lecTimeTableRouter')
const lecLessTimeTableRouter = require('./routes/lecLessTimeTableRouter')


const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const app = express() //multer and not only

// app.use(bodyParser.json()) //multer
app.use(express.static('public'))
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

// //MULTER. Route for File Upload: Define a route to handle file upload requests (e.g., POST /upload)
// app.post('/public', upload.single('file'), (req, res) => {
//   // Access uploaded file details in req.file object (filename, originalname, etc.)
//   const uploadedFile = req.file;

//   // Save file information to MongoDB (replace with your schema)
//   const newFile = new File({
//       filename: uploadedFile.filename,
//       originalname: uploadedFile.originalname,
//       // Add other relevant file information
//   });

//   newFile.save()
//       .then(() => res.json({ message: 'File uploaded successfully!' }))
//       .catch(err => res.status(500).json({ error: err.message }));
// });

app.use('/api/students', studentRouter)
app.use('/api/lessonsStudLec', lessonsStudLecRouter)
app.use('/api/lectors', lectorsRouter)
app.use('/api/connectionStudLec', connectionStudLecRouter)
app.use('/api/languages', languagesRouter)
app.use('/api/books', bookRouter)
app.use('/api/studentTimeTable', studentTimeTableRouter)
app.use('/api/studentLessTimeTable', studentLessTimeTableRouter)
app.use('/api/lecTimeTable', lecTimeTableRouter)
app.use('/api/lecLessTimeTable', lecLessTimeTableRouter)

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'failed',
    message: err.message
  })
})

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'The requested route is not exist on this server'
  })
})

const port = 3008


app.listen(port, () => {
  console.log(`Server listsning at http://localhost:${port}`);
});
const connectDB = async (url) => {
  await mongoose.connect(url)
  console.log(`Connected to database: ${mongoose.connection.name}`);

}
connectDB(process.env.M)
  .then(() => {
    console.log("The data base has been connected");
  })
  .catch(err => console.log(err.message))



module.exports = app