const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const Starboard = require('../schemas/starboard');

function getStarEmoji(starCount) {
  if (starCount >= 5) return '🌟';
  if (starCount >= 10) return '✨';
  if (starCount >= 20) return '🌠';
  return '⭐';
}

async function getRepliedMessageContent(repliedMessage) {
  if (repliedMessage.content) {
    return repliedMessage.content.slice(0, 1024);
  } else if (repliedMessage.attachments.size > 0) {
    const firstAttachment = repliedMessage.attachments.first();
    const attachmentType = firstAttachment.contentType;

    if (attachmentType.startsWith('image/')) {
      return '`[Attached Image 🖼️]`';
    } else if (attachmentType.startsWith('video/')) {
      return '`[Attached Video 🎥]`';
    } else {
      return '`[Attached File 📁]`';
    }
  }
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

      if (starCount < 3) return;

      const starboardChannel = message.guild.channels.cache.get('1293008256050003998');

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
        const repliedMessageContent = await getRepliedMessageContent(repliedMessage);

        let repliedMessageField;
        if (repliedMessage.content && repliedMessage.attachments.size > 0) {
          repliedMessageField = `${repliedMessageContent} \n\`[Attachment 🖼️]\``;
        } else {
          repliedMessageField = repliedMessageContent;
        }

        embed.addFields({
          name: `Replied to ${repliedMessage.author.displayName} `,
          value: repliedMessageField,
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

      const existingEntry = await Starboard.findOne({ originalMessageId: message.id });

      if (existingEntry) {
        const starboardMessage = await starboardChannel.messages.fetch(existingEntry.starboardMessageId);
        await starboardMessage.edit(starboardMessageData);
      } else {
        const starboardMessage = await starboardChannel.send(starboardMessageData);
        const newEntry = new Starboard({
          originalMessageId: message.id,
          starboardMessageId: starboardMessage.id,
        });
        await newEntry.save();
      }
    } catch (error) {
      console.error('Error in messageReactionAdd event:', error);
    }
  },
};
