const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server"),
  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setTitle(interaction.guild.name)
      .setDescription("🌐 **Invite:** https://discord.gg/autismcrew")
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .setThumbnail(guild.iconURL())
      .setColor(Math.floor(Math.random() * (1 << 24)))
      .addFields(
        { name: '\n', value: '\n' },
        { name: "👑 **Owner**", value: `<@${guild.ownerId}>`, inline: true },
        { name: "👥 **Members**", value: `${guild.memberCount}`, inline: true },
        { name: "🔥 **Roles**", value: `${guild.roles.cache.size}`, inline: true },
        { name: '\n', value: '\n' },
        { name: "🍻 **Channels**", value: `${guild.channels.cache.size}`, inline: true },
        { name: "<:boost:1241246316496162836> Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true },
        { name: "👶 **Birthday**", value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '\n', value: '\n' },
      )
      .setFooter({ text: `${guild.name} | Created at ${guild.createdAt.toLocaleString()}`, iconURL: guild.iconURL() })
    await interaction.reply({ embeds: [embed] });
  },
};
