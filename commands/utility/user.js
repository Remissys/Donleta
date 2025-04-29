const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user'),
    async execute(interaction) {
        console.log(interaction.user, interaction.member)
        await interaction.reply(`This command was run by ${interaction.user.globalName}, who joined on ${interaction.member.joinedAt}`)
    }
}