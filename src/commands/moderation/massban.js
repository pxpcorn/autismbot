const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('massban')
    .setDescription('Banir todos os membros que entraram nos últimos x segundos (30 min = 1800 segundos)')
    .addIntegerOption((option) => option.setName('seconds').setDescription('Number of seconds').setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has('498606831967404044')) {
      return interaction.reply({ content: 'Não tens permissões para usar este comando.', ephemeral: true });
    }

    const seconds = interaction.options.getInteger('seconds');
    const maxSeconds = 1800;

    if (seconds > maxSeconds) {
      return interaction.reply({
        content: `Só podes banir até 30 minutos. \`(${maxSeconds} segundos)\``,
        ephemeral: true,
      });
    }

    const membersToBan = interaction.guild.members.cache.filter(
      (member) => Date.now() - member.joinedTimestamp < seconds * 1000
    );

    if (membersToBan.size === 0) {
      return interaction.reply({
        content: `Nenhum membro entrou nos últimos **${seconds} segundos**.`,
        ephemeral: true,
      });
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('confirm_ban').setLabel('Yes').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cancel_ban').setLabel('No').setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      content: `Tens a certeza que queres banir **${membersToBan.size} membros**?`,
      components: [row],
      ephemeral: true,
    });

    const filter = (i) => i.customId === 'confirm_ban' || i.customId === 'cancel_ban';
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (i) => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({ content: 'Não podes interagir com este botão.', ephemeral: true });
      }

      if (i.customId === 'confirm_ban') {
        try {
          await i.update({ content: 'Banning users...', components: [] });

          for (const member of membersToBan.values()) {
            await member.ban({ reason: 'Mass ban command' });
          }

          await interaction.editReply({ content: `**${membersToBan.size} membros** foram banidos.`, components: [] });
        } catch (error) {
          console.error(error);
          await interaction.editReply({ content: 'An error occurred while banning the users.', components: [] });
        }
      } else if (i.customId === 'cancel_ban') {
        await i.update({ content: 'Ban cancelado.', components: [] });
      }
    });

    collector.on('end', (collected) => {
      if (collected.size === 0) {
        interaction.editReply({ content: '**Ban timed out**. Nenhum membro foi banido.', components: [] });
      }
    });
  },
};
