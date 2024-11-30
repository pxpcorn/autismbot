const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Avatar de um membro do servidor')
    .addUserOption((option) => option.setName('user').setDescription('escolhe um membro')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    const av = member.displayAvatarURL({ size: 512 }) || user.displayAvatarURL({ size: 512 });
    const avURL = member.avatarURL({ size: 512 }) || user.avatarURL({ size: 512 });

    const embed = new EmbedBuilder()
      .setColor(Math.floor(Math.random() * (1 << 24)))
      .setTitle(`${user.tag}'s avatar`)
      .setImage(av)
      .setTimestamp();

    const button = new ButtonBuilder().setLabel('Avatar Link').setStyle(ButtonStyle.Link).setURL(avURL);

    const row = new ActionRowBuilder().addComponents(button);

    return interaction.reply({ embeds: [embed], components: [row] });
  },
};
