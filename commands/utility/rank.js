const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("shows participants ranking during the current iteration of the competition"),
    async execute(interaction){

        const rankingsEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Rankings')
            .setAuthor({ 
                name: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png', 
                url: 'https://twitch.com/don_nobru' 
            })
            .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png')
            .addFields(
                { name: '\u200B', value: '**Remissys**\nTentativas:\nTotal:\n\n**Biel**\nTentativas:\nTotal:\n\n**Ghost**\nTentativas:\nTotal:', inline: true },
                { name: '\u200B', value: '**\n6 | 11 | 9\n20\n\n\n10 | 10 | 8\n20\n\n\n10\n10\n**', inline: true },
            )
            .setTimestamp()
            .setFooter({ 
                text: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png' 
            });

        await interaction.reply({ embeds: [rankingsEmbed], components: [actionRow]})
    }
}