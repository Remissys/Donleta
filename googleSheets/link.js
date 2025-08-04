const authorize = require('./auth')
const { google } = require('googleapis')
const { sheetId } = require('../config.json')

async function getParticipantsList(name) {
    const auth = await authorize()
    const sheets = google.sheets({ version: 'v4', auth})

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Dados Dropdown!G2:G'
    })

    const rows = res.data.values

    if (!rows || rows.length == 0) {
        console.log('data not found!')
        return
    }

    let isParticipant = rows.some(item => item[0].trim() == name)

    return isParticipant
}

module.exports = getParticipantsList