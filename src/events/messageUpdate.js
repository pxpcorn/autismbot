const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    if (newMessage.author.bot) return;
    if (newMessage.channel.id !== '1102310198451904622') return;

    // Delete any edited message in the counting channel
    try {
      await newMessage.delete();
    } catch (err) {
      console.error('Failed to delete edited message:', err);
    }
  },
};
