const {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('help').setDescription('Todos os comandos disponíveis'),
  async execute(interaction) {
    const select = new StringSelectMenuBuilder()
      .setCustomId('categorias')
      .setPlaceholder('Make a selection!')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('🔧 Utility')
          .setDescription('Utility commands.')
          .setValue('utility'),
        new StringSelectMenuOptionBuilder().setLabel('😎 Fun').setDescription('Funny commands.').setValue('fun'),
        new StringSelectMenuOptionBuilder()
          .setLabel('👮 Moderation')
          .setDescription('Moderation commands.')
          .setValue('moderation'),
        new StringSelectMenuOptionBuilder()
          .setLabel('🎲 Miscellaneous')
          .setDescription('Misc commands')
          .setValue('misc')
      );

    const row = new ActionRowBuilder().addComponents(select);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() })
      .setDescription(
        '<a:g_PepeHat:1241409438456348695> **The Official Autism™ Discord Bot** <a:g_PepeHat:1241409438456348695>\n\n**Categorias de comandos:**\n- 🔧 Utility\n- 👮 Moderation\n- 😎 Fun\n- 🎲 Miscellaneous\n\n💡*Seleciona uma categoria aqui em baixo para mais detalhes sobre os comandos.*'
      )
      .setThumbnail(interaction.guild.iconURL())
      .setColor(Math.floor(Math.random() * (1 << 24)))
      .setTimestamp();
    await interaction.reply({
      embeds: [embed],
      components: [row],
    });

    const filter = (i) => i.customId === 'categorias' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (i) => {
      if (!i.isStringSelectMenu()) return;

      let embed;
      switch (i.values[0]) {
        case 'utility':
          embed = new EmbedBuilder()
            .setTitle('🔧 Utility Commands')
            .setDescription('Here are some utility commands...')
            .setColor(Math.floor(Math.random() * (1 << 24)));
          break;
        case 'fun':
          embed = new EmbedBuilder()
            .setTitle('😎 Fun Commands')
            .setDescription('Here are some fun commands...')
            .setColor(Math.floor(Math.random() * (1 << 24)));
          break;
        case 'moderation':
          embed = new EmbedBuilder()
            .setTitle('👮 Moderation Commands')
            .setDescription('Here are some moderation commands...')
            .setColor(Math.floor(Math.random() * (1 << 24)));
          break;
        case 'misc':
          embed = new EmbedBuilder()
            .setTitle('🎲 Miscellaneous Commands')
            .setDescription('Here are some miscellaneous commands...')
            .setColor(Math.floor(Math.random() * (1 << 24)));
          break;
      }

      await i.update({ embeds: [embed], components: [row] });
    });

    collector.on('end', (collected) => {
      if (collected.size === 0) {
        interaction.followUp({ content: 'Não selecionaste nenhuma categoria.', ephemeral: true });
      }
    });
  },
};
