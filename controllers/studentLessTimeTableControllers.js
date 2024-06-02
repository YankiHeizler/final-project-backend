const ConnectionStudLec = require('./../models/connectionStudLecModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getLessStudentTimeTable = asyncHandler(async (req, res) => {
    const studID = req.id //to change on req.id
    
    const { connectionID } = req.params
    
    const optionalHours = {
        '06:00': 0, '07:00': 1, '08:00': 2, '09:00': 3, '10:00': 4, '11:00': 5, '12:00': 6, '13:00': 7,
        '14:00': 8, '15:00': 9, '16:00': 10, '17:00': 11, '18:00': 12, '19:00': 13, '20:00': 14, '21:00': 15
    }

    //enum status = [ 'unavailable', 'already scheduled', 'available']

    const optionalDates = {}
    const lessons = Array(5).fill(0).map(arr =>
        Array(16).fill(0).map((cell, i) => {
            return { hour: Object.keys(optionalHours)[i], backgroundColor: 'grey', status: 'unavailable' }
        }))
    const dates = []

    let curr = new Date(); // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    dates.push(new Date(curr.setDate(first)).toLocaleDateString('en-GB').replaceAll('/', '.'))
    optionalDates[dates[0]] = 0
    for (let i = 1; i < 5; i++) {
        let nextDay = first + i; // last day is the first day + 4
        let lastday = new Date(curr.setDate(nextDay)).toLocaleDateString('en-GB').replaceAll('/', '.');
        optionalDates[lastday] = i
        dates.push(lastday)
    }

    let StudentLessTimeTable = await ConnectionStudLec.findById(connectionID)
        .populate('connLessons lecID connBooks')
        .select("-__v -studID");
      
    const lecID = StudentLessTimeTable.lecID._id
   
    for (let i = 0; i < StudentLessTimeTable.lecID.lecTimeTable.length; i++) {
        const dayIndex = StudentLessTimeTable.lecID.lecTimeTable[i].day - 1
        for (let j = 0; j < StudentLessTimeTable.lecID.lecTimeTable[i].workinghours.length; j++) {
            const hourIndex = optionalHours[StudentLessTimeTable.lecID.lecTimeTable[i].workinghours[j]]
           
            lessons[dayIndex][hourIndex] = {
                ...lessons[dayIndex][hourIndex],
                backgroundColor: 'white',
                status: 'available'
            }
        }
    }
    StudentLessTimeTable = await ConnectionStudLec.find({ studID: studID })
        .populate('connLessons lecID connBooks')
        .select("-__v -studID");

    for (let i = 0; i < StudentLessTimeTable.length; i++) {
        for (let j = 0; j < StudentLessTimeTable[i].connLessons.length; j++) {

            const date = StudentLessTimeTable[i].connLessons[j].lessDate.toLocaleDateString('en-GB').replaceAll('/', '.')
            const hour = StudentLessTimeTable[i].connLessons[j].lessTime
            const dateIndex = optionalDates[date]
            const hourIndex = optionalHours[hour]
            console.log('working')

            if (dateIndex!=undefined && hourIndex!=undefined) {
            lessons[dateIndex][hourIndex] = {
                hour,
                backgroundColor: StudentLessTimeTable[i]._id == connectionID ? 'green' : 'grey',
                status: StudentLessTimeTable[i]._id == connectionID ? 'already scheduled' : 'unavailable'
            }
        }
        }
    }


    StudentLessTimeTable = await ConnectionStudLec.find({ lecID, studID: { $ne: studID } })
        .populate('connLessons lecID connBooks')
        .select("-__v -studID");
    
    
    for (let i = 0; i < StudentLessTimeTable.length; i++) {
        
        for (let j = 0; j < StudentLessTimeTable[i].connLessons.length; j++) {
            
            const date = StudentLessTimeTable[i].connLessons[j].lessDate.toLocaleDateString('en-GB').replaceAll('/', '.')
            const hour = StudentLessTimeTable[i].connLessons[j].lessTime
            const dateIndex = optionalDates[date]
            const hourIndex = optionalHours[hour]

            if (dateIndex!=undefined && hourIndex!=undefined) {
            lessons[dateIndex][hourIndex] = {
                hour,
                backgroundColor: 'grey',
                status: 'unavailable' 
            }
        }
        }
    }


    res.status(200).json({
        status: 'success',
        dates,
        lessons,
    })
})
