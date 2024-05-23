const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const starboardMessages = {};

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        return;
      }
    }
    /* ***** Starboard Add ***** */
    try {
      if (reaction.emoji.name !== '⭐') return;

      let isVideo = false;
      let videoURL = ' ';
      const { message } = reaction;
      const starCount = message.reactions.cache.get('⭐').count;

      if (starCount >= 1 && !starboardMessages[message.id]) {
        const starboardChannel = message.guild.channels.cache.get('1242913284676517909');

        const embed = new EmbedBuilder()
          .setColor(Math.floor(Math.random() * (1 << 24)))
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() });

        if (message.attachments.size > 0) {
          for (const attachment of message.attachments.values()) {
            const contentType = attachment.contentType;
            if (contentType.startsWith('video/')) {
              isVideo = true;
              videoURL = attachment.url;
              embed.setImage('https://www.shutterstock.com/shutterstock/videos/1102576935/thumb/2.jpg?ip=x480');
              break;
            } else if (contentType.startsWith('image/')) {
              embed.setImage(message.attachments.first().url);
              break;
            }
          }
        }
        if (message.content) {
          embed.setDescription(message.content);
        }
        if (!isVideo) {
          embed.addFields({ name: 'Jump to Message', value: `[Click Here](${message.url})` });
        }
        embed.setTimestamp();

        if (isVideo) {
          const filename = videoURL.split('/').pop().split('?')[0];
          const button = new ButtonBuilder().setLabel(filename).setStyle(ButtonStyle.Link).setURL(`${message.url}`);
          const row = new ActionRowBuilder().addComponents(button);

          const starboardMessage = await starboardChannel.send({
            content: `⭐ **${starCount}** | ${message.url}`,
            embeds: [embed],
            components: [row],
          });

          starboardMessages[message.id] = {
            starboardMessageId: starboardMessage.id,
            starCount,
          };
        } else {
          const starboardMessage = await starboardChannel.send({
            content: `⭐ **${starCount}** | ${message.url}`,
            embeds: [embed],
          });

          starboardMessages[message.id] = {
            starboardMessageId: starboardMessage.id,
            starCount,
          };
        }
      }
    } catch (error) {
      console.error('Error in messageReactionAdd event:', error);
    }
  },
};
