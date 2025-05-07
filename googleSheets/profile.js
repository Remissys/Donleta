const authorize = require('./auth.js')
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getUserProfile(name) {
    const auth = await authorize()
    const sheets = google.sheets({ version: 'v4', auth })

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Runs Diarias!A2:L'
    })

    const rows = res.data.values

    if (!rows || rows.length == 0) {
        console.log('No data found')
        return
    }

    let filteredData = rows.filter(row => row[1] == name).sort((a, b) => b[0] - a[0])

    // Reverse is used because data is already ordered chronologically on spreadsheet
    filteredData = rows.filter(row => row[1] == name).reverse()

    return filteredData
}

module.exports = getUserProfile