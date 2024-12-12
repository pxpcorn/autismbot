const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    /* ***** Leave Message ***** */
    if (member.user.bot) return;

    const channel = member.guild.channels.cache.get('947580770866827315');
    if (!channel) return;

    return channel.send(`\`${member.user.username}\` saiu do servidor. -1 next <a:e_DogHi:555071736438063114>`);
  },
};
