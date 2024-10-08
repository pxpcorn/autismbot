const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    /* ***** One Word Story ***** */
    if (message.channel.id === '1292960072158281890') {
      const fetchMsg = await message.channel.messages.fetch({ limit: 2 });
      const lastMsg = fetchMsg.size === 1 ? null : fetchMsg.last();
      if (
        (message.content && (message.content.split(' ').length > 1 || message.content.length > 15)) ||
        message.author.bot ||
        lastMsg?.author.id === message.author.id
      ) {
        message.delete().catch(console.error);
        return;
      }
    }

    /* ***** Counting System ***** */
    if (message.channel.id === '1102310198451904622' && !message.author.bot) {
      const currentCount = parseInt(message.content);
      const fetchedMessages = await message.channel.messages.fetch({ limit: 2 });
      const lastMessage = fetchedMessages.size === 1 ? null : fetchedMessages.last();
      const lastCount = lastMessage ? parseInt(lastMessage.content) : 0;

      if (currentCount !== lastCount + 1 || lastMessage?.author.id === message.author.id) {
        message.delete().catch(console.error);
        return;
      }
    }
  },
};
