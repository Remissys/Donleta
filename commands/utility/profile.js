const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js')
const getUserProfile = require('../../googleSheets/profile.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Mostra detalhes das ultimas runs do usuário!')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Nome da twitch do usuário (Ex: don_nobru)')
                .setRequired(true)
        ),
    async execute(interaction) {

        const name = interaction.options.getString('nome')

        await interaction.deferReply()

        // Get data from googlesheets
        const data = await getUserProfile(name)

        console.log('fetched data: ', data)

        // Data not found for especified month return
        if(!data || data.length == 0) {
            await interaction.editReply({ content: "Não foram encontrados dados para o nome especificado!" })
            return
        }

        const profileEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setAuthor({ 
                name: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png', 
                url: 'https://twitch.com/don_nobru' 
            })
            .setTimestamp()
            .setFooter({ 
                text: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png' 
            });

        // Standard for pagination to show 3 items each time
        let page = 0
        let size = 3

        for (let i = page*size; i < (page+1)*size && i < data.length; i++) {
            console.log('looped through data: ', data[i])
            profileEmbed.addFields(
                { 
                    name: `${data[i][0]}`, 
                    value: `**Time** *${data[i][2]}* **(${data[i][3]})** | *${data[i][4]}* **(${data[i][5]})**\n**Boss:** *${data[i][6]}* **(${data[i][7]})**\n**Tempo:** *${data[i][8]}* **(${data[i][9]})**\n\u200B\n*Pontos: ${data[i][11]}*\n\u200B`
                },        
            )
        }

        let numPages = Math.ceil(data.length/size)

        profileEmbed.setTitle(`${data[0][1]} (${page+1}/${numPages})`)

        // await interaction.editReply({ embeds: [profileEmbed] })

        const next = new ButtonBuilder()
             .setCustomId('next')
             .setLabel('>')
             .setStyle(ButtonStyle.Secondary)
             .setDisabled(page+1 == numPages)
 
        const previous = new ButtonBuilder()
            .setCustomId('previous')
            .setLabel('<')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(page == 0)

        const actionRow = new ActionRowBuilder()
            .addComponents(previous, next)

        const message = await interaction.editReply({ embeds: [profileEmbed], components: [actionRow] })

        const collectorFilter = i => i.user.id === interaction.user.id

        const collectedInteraction = await message.awaitMessageComponent({
            ComponentType: ComponentType.Button,
            filter: collectorFilter,
            idle: 60_000
        })
        .catch(_ => {
            console.log('tchau')
            interaction.editReply({ content: 'deu ruim', embeds: [profileEmbed], components: []})
        })

        if (collectedInteraction) {
            if (collectedInteraction.customId === 'next') {
                page += 1
            } else if (collectedInteraction.customId === 'previous') {
                page -= 1
            }

            // Empty embed fields for editing
            profileEmbed.setFields([])

            for (let i = page*size; i < (page+1)*size && i < data.length; i++) {
                console.log('looped through data: ', data[i])
                profileEmbed.addFields(
                    { 
                        name: `${data[i][0]}`, 
                        value: `**Time** *${data[i][2]}* **(${data[i][3]})** | *${data[i][4]}* **(${data[i][5]})**\n**Boss:** *${data[i][6]}* **(${data[i][7]})**\n**Tempo:** *${data[i][8]}* **(${data[i][9]})**\n\u200B\n*Pontos: ${data[i][11]}*\n\u200B`
                    },        
                )
            }

            profileEmbed.setTitle(`${data[0][1]} (${page+1}/${numPages})`)

            next.setDisabled(page+1 == numPages)
            previous.setDisabled(page == 0)

            interaction.editReply({ embeds: [profileEmbed], components: [actionRow] })
        }
    }
}