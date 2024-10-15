const { Events } = require('discord.js');

const INTERVAL_TIME = 30 * 60 * 1000;
let lastUpdated = 0;

module.exports = {
  name: Events.PresenceUpdate,
  async execute(oldPresence, newPresence) {
    const currentTime = Date.now();
    if (currentTime - lastUpdated < INTERVAL_TIME) {
      return;
    }

    const guild = newPresence.guild;
    const voiceChannel = guild.channels.cache.get('1108938962166362155');
    if (!voiceChannel) return;

    let online = 0;
    let dnd = 0;
    let idle = 0;

    guild.members.cache.forEach((member) => {
      if (member.presence) {
        switch (member.presence.status) {
          case 'online':
            online++;
            break;
          case 'dnd':
            dnd++;
            break;
          case 'idle':
            idle++;
            break;
        }
      }
    });

    const newName = `🟢${online} ⛔${dnd} 🌙${idle}`;
    try {
      await voiceChannel.setName(newName);
      lastUpdated = currentTime;
    } catch (error) {
      console.error('Erro ao atualizar o canal de voz');
    }
  },
};
