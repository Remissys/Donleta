const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const { readFile, writeFile } = require('node:fs/promises')
const path = require('path')
const getParticipantsList = require('../../googleSheets/link')

const linkedUsersPath = path.resolve(__dirname, '../../discordData/linked-users.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Vincula sua conta do Discord com seu perfil da Donleta!')
        .addStringOption(option =>
            option.setName('perfil')
                .setDescription('nome do participante usado durante a roleta (Ex: Don nobru')
                .setRequired(true)
        ),
    async execute(interaction) {

        //catch name for linking
        const name = interaction.options.getString('perfil')

        await interaction.deferReply({ flags: MessageFlags.Ephemeral })

        //verify if name exists in participants list
        let isParticipant = await getParticipantsList(name)

        if (!isParticipant) {
            await interaction.editReply('O nome informado não está na lista de participantes da Donleta!')
            return
        }

        let userInfo = {"discordID": interaction.user.id, "discordUsername": interaction.user.username, "playerName": name}

        try {
            const content = await readFile(linkedUsersPath, { encoding: 'utf-8' })

            let parsedContent = JSON.parse(content)

            //verify if user or participant is already linked
            let isUserLinked = parsedContent.some(item => item.discordID === interaction.user.id)
            let isParticipantLinked = parsedContent.some(item => item.playerName === name)
    
            if (isUserLinked) {
                await interaction.editReply('Você já está linkado a um participante!')
                return
            } else if (isParticipantLinked) {
                await interaction.editReply('Esse participante já está linkado a outro usuário!')
                return
            } 

            //links user to participant in json file
            parsedContent.push(userInfo)

            await writeFile(linkedUsersPath, JSON.stringify(parsedContent, null, 2), { encoding: 'utf-8' })
            await interaction.editReply('Sua conta foi linkada com sucesso!')

        } catch (err) {
            console.log('codigo de erro: ', err)

            //verifies if file is missing and creates a new one
            if (err.code === 'ENOENT') {
                console.log('file does not exist')

                try {
                    await writeFile(linkedUsersPath, JSON.stringify([userInfo], null, 2), { encoding: 'utf-8' })

                    await interaction.editReply('Sua conta foi linkada com sucesso!')
                } catch (err) {
                    console.log('Erro ao criar linked-users.json', err.code)
                    await interaction.editReply('Houve um erro ao linkar sua conta')
                }

            } else {
                console.log('Erro ao verificar se conta está linkada')
                await interaction.editReply('Houve um erro ao linkar sua conta')
            }
        }
    }
}