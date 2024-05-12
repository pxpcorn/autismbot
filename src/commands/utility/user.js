const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about user"),
  async execute(interaction) {
    await interaction.reply(
      `This command was ran by ${interaction.user.username} and joined this server at ${interaction.member.joinedAt}.`
    );
  },
};
