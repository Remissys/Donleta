const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js')
const { readFile, appendFile, writeFile,  } = require('node:fs/promises')
const { parse } = require('node:path')
const path = require('path')
// const { users } = require('../../discordData/linked-users.json')

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

        let userInfo = {"discordID": interaction.user.id, "discordUsername": interaction.user.username, "playerName": name}

        try {
            const content = await readFile(linkedUsersPath, { encoding: 'utf-8' })

            let parsedContent = JSON.parse(content)
            let isLinked = parsedContent.some(item => item.playerName === name)

            console.log('islinked: ', isLinked)
    
            if (isLinked) {
                await interaction.editReply('Esse participante já está linkado a outro usuario')
            } else {
                parsedContent.push(userInfo)

                console.log(parsedContent)

                await writeFile(linkedUsersPath, JSON.stringify(parsedContent, null, 2), { encoding: 'utf-8' })

                await interaction.editReply('Sua conta foi linkada com sucesso!')
            }

        } catch (err) {
            console.log('codigo de erro: ', err)
            if (err.code === 'ENOENT') {
                console.log('file does not exist')

                try {
                    await writeFile(linkedUsersPath, JSON.stringify([userInfo], null, 2), { encoding: 'utf-8' })

                    await interaction.editReply('Sua conta foi linkada com sucesso!')
                } catch (err) {
                    console.log('Erro ao editar linked-users.json', err.code)
                    await interaction.editReply('Houve um erro ao linkar sua conta')
                }

            } else {
                console.log('Erro ao verificar se conta está linkada')
                await interaction.editReply('Houve um erro ao linkar sua conta')
            }
        }
    }
}