const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about user")
    .addUserOption(option => option.setName('user').setDescription('the user you want to get info on')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    const status = member.presence?.status ?? 'offline';

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setThumbnail(user.displayAvatarURL())
      .setColor(Math.floor(Math.random() * (1 << 24)))
      .addFields(
        { name: "👤 Member", value: `${user}`, inline: false },
        { name: '\n', value: '\n' },
        { name: "🎨 Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false },
        { name: '\n', value: '\n' },
        { name: "🟢 **Status**", value: `${status}`, inline: false },
        { name: '\n', value: '\n' },
        { name: "**Joined at**", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
        { name: "**Created at**", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
        { name: '\n', value: '\n' },
      )
      .setFooter({ text: `🕵️ User ID: ${user.id}` })
      .setTimestamp()
    await interaction.reply({ embeds: [embed] });
  },
};
