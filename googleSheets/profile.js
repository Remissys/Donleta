const authorize = require('./auth.js')
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getUserProfile(name) {
    const auth = await authorize()
    const sheets = google.sheets({ version: 'v4', auth })

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Runs Diarias!A7:L'
    })

    let rows = res.data.values

    if (!rows || rows.length == 0) {
        console.log('No data found')
        return
    }

    // Exclude empty elements from array
    rows = rows.filter(row => Array.isArray(row) && row.length > 0)

    let filteredData = rows.filter(row => row[1].trim() == name).sort((a, b) => b[0] - a[0])

    // Reverse is used because data is already ordered chronologically on spreadsheet
    filteredData = rows.filter(row => row[1].trim() == name).reverse()

    return filteredData
}

module.exports = getUserProfile