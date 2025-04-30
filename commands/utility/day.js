const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js')
const getDayPerformance = require('../../googleSheets/day.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dia")
        .setDescription("Shows info on a specific day's runs")
        .addStringOption(option => 
            option.setName('data')
                .setDescription('Data da roleta (Ex: 25/04)')
                .setRequired(true)
        ),
    async execute(interaction){

        const date = interaction.options.getString('data')

        await interaction.deferReply({ ephemeral: true })

        // Get values from googlesheets
        const data = await getDayPerformance(date)

        // Data not found for especified date return
        if (!data || data.length == 0) {
            await interaction.editReply({ content: "Não foram encontrados dados para a data especificada!" })
            return
        }

        const dayEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Resultados (${date})`)
            .setAuthor({ 
                name: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png', 
                url: 'https://twitch.com/don_nobru' 
            })
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png')
            .setTimestamp()
            .setFooter({ 
                text: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png' 
            });

        data.forEach((data) => {
            dayEmbed.addFields(
                { 
                    name: `${data[1]}`, 
                    value: `
                        **Time** *${data[2]}* **(${data[3]})** | *${data[4]}* **(${data[5]})**
                        **Boss:** *${data[6]}* **(${data[7]})**
                        **Tempo:** *${data[8]}* **(${data[9]})**
                        \u200B
                        *Pontos: ${data[11]}*
                        \u200B
                    `
                },        
            )
        })

        await interaction.editReply({ embeds: [dayEmbed] })
    }
}