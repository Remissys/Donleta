const authorize = require('./auth')
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getDayPerformance(date) {
    const auth = await authorize()
    const sheets = google.sheets({ version: "v4", auth})

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Runs Diarias!A2:H'
    })

    const rows = res.data.values

    if (!rows || rows.length === 0) {
        console.log('no data found')
        return
    }

    const filteredData = rows.filter(row => row[0] == date)

    return filteredData
}

module.exports = getDayPerformance