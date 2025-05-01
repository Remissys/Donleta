const authorize = require('./auth')
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getDayPerformance(date=null) {
    const auth = await authorize()
    const sheets = google.sheets({ version: "v4", auth})

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Runs Diarias!A2:L'
    })

    const rows = res.data.values

    if (!rows || rows.length === 0) {
        console.log('no data found')
        return
    }

    let filteredData = null

    if (date) {
        filteredData = rows.filter(row => row[0] == date)
    } else {
        // Filters all rows where date is equal to the last row fetched
        filteredData = rows.filter(row => row[0] == rows[rows.length-1][0])
    }

    console.log(filteredData)

    return filteredData
}

module.exports = getDayPerformance