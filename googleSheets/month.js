const authorize = require('./auth.js')
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getMonthPerformance(month=null) {
    const auth = await authorize()
    const sheets = google.sheets({ version: 'v4', auth})

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Placar Mensal!F2:H'
    })

    const rows = res.data.values

    if (!rows || rows.length == 0) {
        console.log('No data found')
        return
    }

    let filteredData = null

    if (month) {
        filteredData = rows.filter(row => row[0] == month)
    } else {
        // Filters all rows where month is equal to the last row's fetched month
        filteredData = rows.filter(row => row[0] == rows[rows.length-1][0])
    }

    return filteredData
}

module.exports = getMonthPerformance