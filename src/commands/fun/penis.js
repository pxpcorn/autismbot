const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('penis')
    .setDescription('Mede o orgão peniano')
    .addUserOption((option) => option.setName('user').setDescription('escolhe um membro')),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    const options = [
      '8D',
      '8=D',
      '8==D',
      '8===D',
      '8====D',
      '8=====D',
      '8======D',
      '8=======D',
      '8========D',
      '8=========D',
      '8==========D',
      '8===========D',
      '8============D',
      '8=============D',
      '8==============D',
      '8===============D',
      '8================D',
      '8=================D',
      '8==================D',
      '8===================D',
      '8====================D',
    ];
    const option = options[Math.floor(Math.random() * options.length)];

    if (user.bot)
      return await interaction.reply(`${interaction.user}, **ERROR!** Size too big. <:g_PepeCool:599260250901577748>`);

    if (user === interaction.user) {
      await interaction.reply(`${user}, Your dick size:\n\`${option}\``);
    } else {
      await interaction.reply(`${interaction.user}, **${member.displayName}**'s dick size:\n\`${option}\``);
    }
  },
};
