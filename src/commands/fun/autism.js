const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('autism')
    .setDescription('Mede o nível de autismo')
    .addUserOption((option) => option.setName('user').setDescription('escolhe um membro')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    if (user.bot)
      return interaction.reply(`${interaction.user}, eu sou um bot oh burro! <:r_FacePalm:695376903279739004>`);

    if (user === interaction.user) {
      return interaction.reply(
        `${user}, o teu nível de autismo é de \`${Math.floor(
          Math.random() * 100
        )}%\` <:g_PepeAutist:1241409363374112849>`
      );
    } else {
      return interaction.reply(
        `${interaction.user}, o nível de autismo de **${member.displayName}** é de \`${Math.floor(
          Math.random() * 100
        )}%\` <:g_PepeAutist:1241409363374112849>`
      );
    }
  },
};
