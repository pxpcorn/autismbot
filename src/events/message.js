const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {

        /* ***** One Word Story ***** */
        if (message.channel.id === '1241446026599075941' && message.content && (message.content.split(" ").length > 1 || message.content.length > 15) || message.author.bot)
            await message.delete();
    }
};