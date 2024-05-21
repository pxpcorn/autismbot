const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Avatar de um membro do servidor')
    .addUserOption((option) => option.setName('user').setDescription('escolhe um membro')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    const embed = new EmbedBuilder()
      .setColor(Math.floor(Math.random() * (1 << 24)))
      .setTitle(`${user.tag}'s avatar`)
      .setImage(`${user.displayAvatarURL({ size: 512 })}`)
      .setTimestamp();

    const button = new ButtonBuilder()
      .setLabel('Avatar Link')
      .setStyle(ButtonStyle.Link)
      .setURL(`${user.avatarURL({ size: 512 })}`);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
