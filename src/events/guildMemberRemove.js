const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    /* ***** Leave Message ***** */
    if (member.user.bot) return;

    const channel = member.guild.channels.cache.get('947580770866827315');
    if (!channel) return;

    await channel.send(`\`${member.user.username}\` saiu do servidor. <a:v_PikaNoWay:695379520727023736>`);

    /* ***** Voice Counter ***** */
    const voiceChannel = member.guild.channels.cache.get('1108937997702942783');
    if (!voiceChannel) return;

    const memberCount = member.guild.memberCount;
    const newChannelName = `📈Members: ${memberCount}`;

    try {
      await voiceChannel.setName(newChannelName);
    } catch (error) {
      console.error('Erro ao atualizar o nome do canal');
    }
  },
};
