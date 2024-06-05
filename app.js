const express = require('express')
const mongoose = require('mongoose');

const studentRouter = require('./routes/studentsRouter')
const lessonsStudLecRouter = require('./routes/lessonsStudLecRouter')
const lectorsRouter = require('./routes/lectorRouter')
const connectionStudLecRouter = require('./routes/connectionStudLecRouter')
const languagesRouter = require('./routes/languagesRouter')
const bookRouter = require('./routes/bookRouter')
const studentTimeTableRouter = require('./routes/studendTimeTableRouter')
const studentLessTimeTableRouter = require('./routes/studentLessTimeTableRouter')
const lecTimeTableRouter = require('./routes/lecTimeTableRouter')
// const lecLessTimeTableRouter = require('./routes/lecLessTimeTableRouter')


const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

app.use('/api/students', studentRouter)
app.use('/api/lessonsStudLec', lessonsStudLecRouter)
app.use('/api/lectors', lectorsRouter)
app.use('/api/connectionStudLec', connectionStudLecRouter)
app.use('/api/languages', languagesRouter)
app.use('/api/books', bookRouter)
app.use('/api/studentTimeTable', studentTimeTableRouter)
app.use('/api/studentLessTimeTable', studentLessTimeTableRouter)
app.use('/api/lecTimeTable', lecTimeTableRouter)
// app.use('/api/lecLessTimeTable', lecLessTimeTableRouter)

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