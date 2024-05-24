const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const starboardMessages = {};

function getStarEmoji(starCount) {
  if (starCount >= 5) return '🌟';
  if (starCount >= 10) return '✨';
  if (starCount >= 20) return '🌠';
  return '⭐';
}

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

    const { message } = reaction;

    if (reaction.emoji.name !== '⭐') return;

    try {
      const starCount = message.reactions.cache.get('⭐').count;

      if (starCount < 1) return;

      const starboardChannel = message.guild.channels.cache.get('1242913284676517909');

      const starEmoji = getStarEmoji(starCount);

      const embed = new EmbedBuilder()
        .setColor(Math.floor(Math.random() * (1 << 24)))
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      let isVideo = false;
      let videoURL = '';

      if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
          const contentType = attachment.contentType;
          if (contentType.startsWith('video/')) {
            isVideo = true;
            videoURL = attachment.url;
            embed.setImage('https://www.shutterstock.com/shutterstock/videos/1102576935/thumb/2.jpg?ip=x480');
            break;
          } else if (contentType.startsWith('image/')) {
            embed.setImage(attachment.url);
            break;
          }
        }
      }

      const repliedMessage = message.reference ? await message.fetchReference() : null;
      if (repliedMessage) {
        const repliedMessageAuthor = repliedMessage.author.displayName;
        const repliedMessageContent = repliedMessage.content.slice(0, 1000);
        embed.addFields({
          name: `Replied To: ${repliedMessageAuthor}`,
          value: `${repliedMessageContent}`,
        });
      }

      if (message.content) {
        embed.setDescription(message.content);
      }

      if (!isVideo) {
        embed.addFields({ name: 'Jump to Message', value: `[Click Here](${message.url})` });
      }

      const starboardMessageData = {
        content: `${starEmoji} **${starCount}** | ${message.url}`,
        embeds: [embed],
      };

      if (isVideo) {
        const filename = videoURL.split('/').pop().split('?')[0];
        const button = new ButtonBuilder().setLabel(filename).setStyle(ButtonStyle.Link).setURL(message.url);

        const row = new ActionRowBuilder().addComponents(button);
        starboardMessageData.components = [row];
      }

      if (starboardMessages[message.id]) {
        const starboardMessage = await starboardChannel.messages.fetch(
          starboardMessages[message.id].starboardMessageId
        );
        await starboardMessage.edit(starboardMessageData);
        starboardMessages[message.id].starCount = starCount;
      } else {
        const starboardMessage = await starboardChannel.send(starboardMessageData);
        starboardMessages[message.id] = {
          starboardMessageId: starboardMessage.id,
          starCount,
        };
      }
    } catch (error) {
      console.error('Error in messageReactionAdd event:', error);
    }
  },
};
