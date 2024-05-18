const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Provides bot ping"),
  async execute(interaction) {
    const ws = interaction.client.ws.ping;
    const msg = await interaction.deferReply();
    await wait(1000);
    await interaction.editReply(`WebSocket: ${ws}ms | Ping: ${msg.createdTimestamp - interaction.createdTimestamp}ms`);
  },
};
