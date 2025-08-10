const { Events, EmbedBuilder } = require('discord.js');

let bump = 1;

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    /* ***** Confess Delete ***** */
    if (message.channel.id === '577996163215654922') {
      return message.delete().catch(console.error);
    }

    /* ***** One Word Story ***** */
    if (message.channel.id === '1292960072158281890') {
      const fetchMsg = await message.channel.messages.fetch({ limit: 2 });
      const lastMsg = fetchMsg.size === 1 ? null : fetchMsg.last();
      if (
        (message.content &&
          (message.content.split(' ').length > 1 || message.content.length > 15 || message.content.includes('\n'))) ||
        message.author.bot ||
        lastMsg?.author.id === message.author.id
      ) {
        return message.delete().catch(console.error);
      }
    }

    /* ***** Counting System ***** */
    if (message.channel.id === '1102310198451904622' && !message.author.bot) {
      const content = message.content;

      if (content.split(' ').length > 1 || content.includes('\n') || !/^\d+$/.test(content)) {
        return message.delete().catch(console.error);
      }

      if (content.length > 1 && content.startsWith('0')) {
        return message.delete().catch(console.error);
      }

      const currentCount = parseInt(content, 10);
      const fetchedMessages = await message.channel.messages.fetch({ limit: 2 });
      const lastMessage = fetchedMessages.size === 1 ? null : fetchedMessages.last();
      const lastCount = lastMessage ? parseInt(lastMessage.content, 10) : 0;

      if (currentCount !== lastCount + 1 || lastMessage?.author.id === message.author.id) {
        return message.delete().catch(console.error);
      }
    }

    /* ***** Bump Reminder ***** */
    if (message.channel.id === '947580770866827315' && message.author.id === '302050872383242240' && bump === 1) {
      bump = 0;
      const embed = new EmbedBuilder()
        .setColor(Math.floor(Math.random() * (1 << 24)))
        .setTitle('<a:c_dance:525378656756039680> HORA DO BUMP <a:c_dance:525378656756039680>')
        .setDescription('Faz `/bump` para dares bump no server!')
        .setTimestamp();
      setTimeout(() => {
        message.channel.send({ content: '<@&498606831967404044>', embeds: [embed] });
        bump = 1;
      }, 7200000);
      return;
    }
  },
};
