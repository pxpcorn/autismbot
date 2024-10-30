const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    /* ***** Leave Message ***** */
    if (member.user.bot) return;

    const channel = member.guild.channels.cache.get('947580770866827315');
    if (!channel) return;

    return channel.send(`\`${member.user.username}\` saiu do servidor. <a:v_PikaNoWay:695379520727023736>`);
  },
};
