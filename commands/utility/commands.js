const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { commands } = require('../../util/constants/commands')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comandos')
        .setDescription('Lista de comandos disponíveis pra o bot da Donleta!'),
    async execute(interaction){

        await interaction.deferReply()

        let commandFieldValues = ''
        
        commands.forEach((command) => {
            commandFieldValues += `${command.name}\n`
        })

        const commandsEmbeed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Comandos')
            .setAuthor({ 
                name: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png', 
                url: 'https://twitch.com/don_nobru' 
            })
            .addFields(
                { name: '\u200B', value: commandFieldValues}
            )
            .setTimestamp()
            .setFooter({ 
                text: 'Donleta', 
                iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/52b34c20-8c4c-45a5-ac4b-0f027610d330-profile_image-70x70.png' 
            });

        await interaction.editReply({ embeds: [commandsEmbeed] })
    }
}