const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks if bot is still alive!'),
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}
