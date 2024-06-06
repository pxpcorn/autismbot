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
        '<a:g_PepeHat:1241409438456348695> **Official Autism™ Discord Bot** <a:g_PepeHat:1241409438456348695>\n\n**Categorias de comandos:**\n- 🔧 Utility\n- 👮 Moderation\n- 😎 Fun\n- 🎲 Miscellaneous\n\n💡*Seleciona uma categoria aqui em baixo para mais detalhes sobre os comandos.*'
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
            .setDescription('**Lista de comandos**')
            .addFields(
              { name: 'help', value: '`/help`', inline: true },
              { name: 'ping', value: '`/ping`', inline: true },
              { name: 'avatar', value: '`/avatar`', inline: true },
              { name: 'server', value: '`/server`', inline: true },
              { name: 'user', value: '`/user`', inline: true }
            )
            .setColor(Math.floor(Math.random() * (1 << 24)))
            .setTimestamp();
          break;
        case 'fun':
          embed = new EmbedBuilder()
            .setTitle('😎 Fun Commands')
            .setDescription('Lista de comandos')
            .addFields(
              { name: 'autism', value: '`/autism`', inline: true },
              { name: 'boobs', value: '`/boobs`', inline: true },
              { name: 'gay', value: '`/gay`', inline: true },
              { name: 'pedo', value: '`/pedo`', inline: true },
              { name: 'penis', value: '`/penis`', inline: true },
              { name: 'qi', value: '`/qi`', inline: true },
              { name: 'simp', value: '`/simp`', inline: true }
            )
            .setColor(Math.floor(Math.random() * (1 << 24)))
            .setTimestamp();
          break;
        case 'moderation':
          embed = new EmbedBuilder()
            .setTitle('👮 Moderation Commands')
            .setDescription('Lista de comandos')
            .addFields({ name: 'ban', value: '`/ban`', inline: true })
            .setColor(Math.floor(Math.random() * (1 << 24)))
            .setTimestamp();
          break;
        case 'misc':
          embed = new EmbedBuilder()
            .setTitle('🎲 Miscellaneous Commands')
            .setDescription('Lista de comandos')
            .addFields({ name: 'confess', value: '`/confess`', inline: true })
            .setColor(Math.floor(Math.random() * (1 << 24)))
            .setTimestamp();
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
