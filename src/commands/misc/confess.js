const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ConfessionNumber = require('../../schemas/confession');

async function initializeConfessionCounter() {
  const existingDoc = await ConfessionNumber.findOne({});
  if (!existingDoc) {
    await ConfessionNumber.create({ confessNumber: 430 });
  }
}

initializeConfessionCounter().catch(console.error);

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('confess')
    .setDescription('Escreve uma confissão')
    .addStringOption((option) => option.setName('confession').setDescription('a tua confissão').setRequired(true)),
  async execute(interaction) {
    const confession = interaction.client.channels.cache.get('577996273571987466');
    const logs = interaction.client.channels.cache.get('568089899404886026');

    if (interaction.channel.id === '577996163215654922') {
      await interaction.reply({
        content: `✅ A tua confissão foi enviada para ${confession.url}`,
        ephemeral: true,
      });

      const confessionDoc = await ConfessionNumber.findOneAndUpdate(
        {},
        { $inc: { confessNumber: 1 } },
        { new: true, upsert: true }
      );

      const currentNumber = confessionDoc.confessNumber;

      const embed = new EmbedBuilder()
        .setColor(Math.floor(Math.random() * (1 << 24)))
        .setTitle(`Confession #${currentNumber}`)
        .setDescription(`"${interaction.options.getString('confession')}"`)
        .setFooter({ text: '❗All confessions are anonymous.' })
        .setTimestamp();

      const logID = await confession.send({ embeds: [embed] });

      const embedLog = new EmbedBuilder()
        .setColor(Math.floor(Math.random() * (1 << 24)))
        .setTitle('Confession Log')
        .setDescription(`"${interaction.options.getString('confession')}"`)
        .addFields(
          { name: 'User', value: `|| ${interaction.user.displayName} (\`${interaction.user.id}\`) ||` },
          { name: 'Link', value: `${logID.url}` }
        )
        .setTimestamp();
      return logs.send({ embeds: [embedLog] });
    }
  },
};
