const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    /* ***** Confess Delete ***** */
    if (message.channel.id === '577996163215654922') {
      message.delete().catch(console.error);
    }

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

    /* ***** Bump Reminder ***** */
    if (message.channel.id === '947580770866827315' && message.author.id === '302050872383242240') {
      const embed = new EmbedBuilder()
        .setColor(Math.floor(Math.random() * (1 << 24)))
        .setTitle('<a:c_dance:525378656756039680> HORA DO BUMP <a:c_dance:525378656756039680>')
        .setDescription('Faz `/bump` para dares bump no server!')
        .setTimestamp();
      setTimeout(() => {
        message.channel.send({ content: '<@&498606831967404044>', embeds: [embed] });
      }, 7200000);
      return;
    }
  },
};
