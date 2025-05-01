const authorize = require("./auth")
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getWeekPerformance(week=null, month=null) {
    const auth = await authorize()
    const sheets = google.sheets({ version: 'v4', auth })

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Runs Semanais!F2:I'
    })

    const rows = res.data.values

    if (!rows || rows.length === 0) {
        console.log('no data found')
        return
    }

    let filteredData = null

    if (month) {
        filteredData = rows.filter(row => row[0] == month)
        
        if (week) {
            filteredData = filteredData.filter(row => row[1] == week)
        } else {
            // Filters all rows where week is equal to the last row's fetched week
            filteredData = filteredData.filter(row => row[1] == filteredData[filteredData.length-1][1])
        }
    } else {
        if (week) {
            filteredData = rows.filter(row => row[1] == week)
        } else {
            filteredData = rows.filter(row => row[1] == rows[rows.length-1][1])
        }

        filteredData = filteredData.filter(row => row[0] == filteredData[filteredData.length-1][0])
    }

    return filteredData
}

module.exports = getWeekPerformance