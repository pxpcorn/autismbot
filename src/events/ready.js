const { Events, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const { mongoURL } = require('../../config.json');
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity('Autism™', { type: ActivityType.Watching });

    if (!mongoURL) return;

    await mongoose.connect(mongoURL || '');

    if (mongoose.connect) {
      console.log('I have connected to the database!');
    } else {
      console.log('Error connecting to database.');
    }
  },
};
