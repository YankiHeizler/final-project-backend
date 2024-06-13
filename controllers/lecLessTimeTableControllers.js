const ConnectionStudLec = require('./../models/connectionStudLecModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

exports.getLessLecTimeTable = asyncHandler(async (req, res) => {
    const { UserFirstDate } = req.params
    const { connectionID } = req.params
    
    const optionalHours = {
        '06:00': 0, '07:00': 1, '08:00': 2, '09:00': 3, '10:00': 4, '11:00': 5, '12:00': 6, '13:00': 7,
        '14:00': 8, '15:00': 9, '16:00': 10, '17:00': 11, '18:00': 12, '19:00': 13, '20:00': 14, '21:00': 15
    }

    //enum status = [  'scheduled', 'not scheduled']

    const optionalDates = {}
    
    const lessons = Array(5).fill(0).map(arr =>
        Array(16).fill(0).map((cell, i) => {
            return { hour: Object.keys(optionalHours)[i], backgroundColor: 'grey', status: 'not scheduled' }
        }))
    
    const dates = []

    let curr = new Date(UserFirstDate); // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    dates.push(new Date(curr.setDate(first)).toLocaleDateString('en-GB').replaceAll('/', '.'))
    optionalDates[dates[0]] = 0
    for (let i = 1; i < 5; i++) {
        let nextDay = first + i; // last day is the first day + 4
        let lastday = new Date(curr.setDate(nextDay)).toLocaleDateString('en-GB').replaceAll('/', '.');
        optionalDates[lastday] = i
        dates.push(lastday)
    }

    const LecLessTimeTable = await ConnectionStudLec.findById(connectionID)
        .populate('connLessons studID connBooks')
        .select("-__v -studID");
    
        for (let i = 0; i < LecLessTimeTable.connLessons.length; i++) {
            const date = LecLessTimeTable.connLessons[i].lessDate.toLocaleDateString('en-GB').replaceAll('/', '.')
            const hour = LecLessTimeTable.connLessons[i].lessTime
            const dateIndex = optionalDates[date]
            const hourIndex = optionalHours[hour]
                 
            if (dateIndex!=undefined && hourIndex!=undefined) {
            lessons[dateIndex][hourIndex] = {                    
                lessID: LecLessTimeTable.connLessons[i]._id,
                status: 'scheduled',
                backgroundColor: 'green',
                hour
                }
            }
        }
        
    res.status(200).json({
        status: 'success',
        dates,
        lessons,
    })
})
