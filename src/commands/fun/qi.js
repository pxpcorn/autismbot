const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('qi')
    .setDescription('Mede o QI')
    .addUserOption((option) => option.setName('user').setDescription('escolhe um membro')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    if (user.bot)
      return interaction.reply(`${interaction.user}, eu sou um bot oh burro! <:r_FacePalm:695376903279739004>`);

    if (user === interaction.user) {
      return interaction.reply(
        `${user}, o teu nível de QI é de \`${Math.floor(Math.random() * 200)}\` <a:c_200qi:596453404579201043>`
      );
    } else {
      return interaction.reply(
        `${interaction.user}, o nível de QI de **${member.displayName}** é de \`${Math.floor(
          Math.random() * 200
        )}\` <a:c_200qi:596453404579201043>`
      );
    }
  },
};
