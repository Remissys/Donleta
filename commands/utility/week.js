const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js')
const getWeekPerformance = require('../../googleSheets/week.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("semana")
        .setDescription("Mostra informações das runs de uma semana específica da roleta!")
        .addStringOption(option => 
            option.setName("semana")
                .setDescription("semana do mês")
                .addChoices(
                    {name: "Semana 1", value: "Semana 1"},
                    {name: "Semana 2", value: "Semana 2"},
                    {name: "Semana 3", value: "Semana 3"},
                    {name: "Semana 4", value: "Semana 4"},
                    {name: "Semana 5", value: "Semana 5"}
                )
        )
        .addStringOption(option => 
            option.setName("mês")
                .setDescription("mês da roleta (Ex: 04)")
        ),
    async execute(interaction){

        // Gets input values if given
        const week = interaction.options.getString("semana")
        const month = interaction.options.getString("mês")

        await interaction.deferReply({ flags: MessageFlags.Ephemeral })

        // Get data from googlesheets
        const data = await getWeekPerformance(week, month)

        // Data not found for especified input return
        if (!data || data.length == 0) {
            await interaction.editReply({ content: "Não foram encontrados dados para a semana e mês especificados!" })
            return
        }

        let weekFieldValues = ``

        data.forEach(info => {
            weekFieldValues += `**${info[2]}** \u2014 *${info[3]}*\n`
        })

        const weekEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Resultados Semanais')
            .setAuthor({ 
                name: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png', 
                url: 'https://twitch.com/don_nobru' 
            })
            .addFields(
                { name: '\u200B', value: weekFieldValues}
            )
            .setTimestamp()
            .setFooter({ 
                text: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png' 
            });

        await interaction.editReply({ embeds: [weekEmbed] })
    }
}