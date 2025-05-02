const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const getMonthPerformance = require('../../googleSheets/month.js')
const { months } = require('../../util/constants/dates.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Monstra informações sobre os rankings mensais da roleta!')
        .addStringOption(option => 
            option.setName('mês')
                .setDescription('mês da roleta (Ex: 04)')
        ),
    async execute(interaction) {

        // Gets input value if given
        const month = interaction.options.getString('mês')

        await interaction.deferReply()

        // Get data from googlesheets
        const data = await getMonthPerformance(month)

        // Data not found for especified month return
        if(!data || data.length == 0) {
            await interaction.editReply({ content: "Não foram encontrados dados para o mês especificado!" })
            return
        }

        let rankFieldValues = ``

        data.forEach(info => {
            rankFieldValues += `**${info[2]}** \u2014 *${info[1]}*\n`
        })

        const rankEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Ranking (${months[data[0][0]-1]})`)
            .setAuthor({ 
                name: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png', 
                url: 'https://twitch.com/don_nobru' 
            })
            .addFields(
                { name: '\u200B', value: rankFieldValues}
            )
            .setTimestamp()
            .setFooter({ 
                text: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png' 
            });

        await interaction.editReply({ embeds: [rankEmbed]})
    }

}