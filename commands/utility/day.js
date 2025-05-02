const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getDayPerformance = require('../../googleSheets/day.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dia")
        .setDescription("Mostra informações das runs de um dia específico da roleta!")
        .addStringOption(option => 
            option.setName('data')
                .setDescription('Data da roleta (Ex: 25/04)')
        ),
    async execute(interaction){

        // Gets date if given
        const date = interaction.options.getString('data')

        await interaction.deferReply()

        // Get values from googlesheets
        const data = await getDayPerformance(date)

        // Data not found for especified date return
        if (!data || data.length == 0) {
            await interaction.editReply({ content: "Não foram encontrados dados para a data especificada!" })
            return
        }

        const dayEmbed = new EmbedBuilder()
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

        console.log(data)

        if (date) {
            dayEmbed.setTitle(`Resultados (${date})`)
        } else {
            dayEmbed.setTitle(`Resultados (${data[0][0]})`)
        }

        data.forEach((row) => {
            dayEmbed.addFields(
                { 
                    name: `${row[1]}`, 
                    value: `**Time** *${row[2]}* **(${row[3]})** | *${row[4]}* **(${row[5]})**\n**Boss:** *${row[6]}* **(${row[7]})**\n**Tempo:** *${row[8]}* **(${row[9]})**\n\u200B\n*Pontos: ${row[11]}*\n\u200B`
                },        
            )
        })

        await interaction.editReply({ embeds: [dayEmbed] })
    }
}