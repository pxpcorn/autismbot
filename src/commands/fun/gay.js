const { RoleSelectMenuInteraction } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('gay')
    .setDescription('Mede o nível de homosexualidade')
    .addUserOption((option) => option.setName('user').setDescription('escolhe um membro')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    if (user.bot)
      return interaction.reply(`${interaction.user}, EU SOU MACHO CARALHO! <:g_PepeSpit:816865612734791711>`);

    if (user === interaction.user) {
      return interaction.reply(
        `${user}, o teu nível de homosexualidade é de \`${Math.floor(
          Math.random() * 100
        )}%\` <:g_peperose:813479937742864396>`
      );
    } else {
      return interaction.reply(
        `${interaction.user}, o nível de homosexualidade de **${member.displayName}** é de \`${Math.floor(
          Math.random() * 100
        )}%\` <:g_peperose:813479937742864396>`
      );
    }
  },
};
