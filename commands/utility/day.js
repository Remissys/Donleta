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

        await interaction.deferReply()

        // Get values from googlesheets
        const data = await getDayPerformance(date)       

        // Data not found for especified date return
        if (date == "30/02") {
            await interaction.editReply({ content: "Não foram encontrados dados para a data especificada!", flags: MessageFlags.Ephemeral })
            return
        }

        // const mockData = [
        //     {
        //         name: "Remissys",
        //         team: [
        //             {
        //                 character: "Chevreuse",
        //                 points: 2
        //             },
        //             {
        //                 character: "Yun Jin",
        //                 points: 3
        //             }
        //         ],
        //         boss: {
        //             desc: "Geovishap",
        //             points: 2
        //         },
        //         time: {
        //             desc: "Entre 5:01 e 7:00",
        //             points: 2
        //         },
        //         total: 9
        //     },
        //     {
        //         name: "Biel",
        //         team: [
        //             {
        //                 character: "Chevreuse",
        //                 points: 2
        //             },
        //             {
        //                 character: "Yun Jin",
        //                 points: 3
        //             }
        //         ],
        //         boss: {
        //             desc: "Geovishap",
        //             points: 2
        //         },
        //         time: {
        //             desc: "Acima de 10:00",
        //             points: 0
        //         },
        //         total: 7
        //     }
        // ]

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

        // for (let data in mockData) {
        // mockData.forEach((data) => {
        //     dayEmbed.addFields(
        //         { 
        //             name: `${data.name}`, 
        //             value: `
        //                 **Time** *${data.team[0].character}* **(${data.team[0].points})** | *${data.team[1].character}* **(${data.team[1].points})**
        //                 **Boss:** *${data.boss.desc}* **(${data.boss.points})**
        //                 **Tempo:** *${data.time.desc}* **(${data.time.points})**
                        
        //                 *Pontos: ${data.total}*
        //                 \u200B
        //             `
        //         },        
        //     )
        // })
        data.forEach((data) => {
            dayEmbed.addFields(
                { 
                    name: `${data[1]}`, 
                    value: `
                        **Time** *${data[2]}* **(?)** | *${data[3]}* **(?)**
                        **Boss:** *${data[4]}* **(?)**
                        **Tempo:** *${data[5]}* **(?)**
                        \u200B
                        *Pontos: ${data[7]}*
                        \u200B
                    `
                },        
            )
        })

        await interaction.editReply({ embeds: [dayEmbed] })
    }
}