const { Collection, Events, MessageType, PermissionsBitField } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isButton()) {
      // Botões de cores
      if (
        interaction.customId === 'warm_colors' ||
        interaction.customId === 'cool_colors' ||
        interaction.customId === 'gradient_colors' ||
        interaction.customId === 'remove_color'
      ) {
        try {
          await require('../commands/moderation/colors').handleButton(interaction);
        } catch (error) {
          console.error(error);
        }
        return;
      }

      // Botões de confissões
      if (interaction.customId.startsWith('confess_reply_')) {
        const confessionNumber = interaction.customId.split('_')[2];
        let thread = interaction.channel.threads.cache.find((t) => t.name === `confession-${confessionNumber}`);

        if (!thread) {
          thread = await interaction.message.startThread({
            name: `confession-${confessionNumber}`,
            autoArchiveDuration: 1440,
          });
          // espera rápida para a mensagem de sistema aparecer
          await new Promise((res) => setTimeout(res, 700));

          try {
            const fetched = await interaction.channel.messages.fetch({ limit: 12 });

            const sysMsg = fetched.find(
              (m) =>
                m.type === MessageType.ThreadCreated ||
                m.system === true ||
                (typeof m.content === 'string' &&
                  m.content.includes(`started a thread`) &&
                  m.content.includes(thread.name))
            );

            if (sysMsg) {
              await sysMsg.delete().catch((err) => console.error('Erro ao apagar mensagem de sistema:', err));
            }
          } catch (err) {
            console.error('Erro ao procurar/apagar mensagem de sistema:', err);
          }
        }

        await interaction.reply({
          content: `💬 Podes continuar a conversa aqui: ${thread}`,
          flags: 64,
        });
        return;
      }
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
