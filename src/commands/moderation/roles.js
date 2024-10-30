const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Devolve as roles consoante o nível')
    .addUserOption((option) => option.setName('user').setDescription('Especifica um usuário').setRequired(true))
    .addIntegerOption((option) => option.setName('level').setDescription('Nível do usuário').setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has('498606831967404044')) {
      return interaction.reply({ content: 'Não tens permissões para usar este comando.', ephemeral: true });
    }

    const targetUser = interaction.options.getMember('user');
    const level = interaction.options.getInteger('level');

    const levelRoles = [
      { level: 1, roleId: '1276997533364916427' },
      { level: 5, roleId: '459119370359013376' },
      { level: 10, roleId: '422411712428245007' },
      { level: 20, roleId: '473597175935533056' },
      { level: 30, roleId: '498338620936028160' },
      { level: 40, roleId: '422409041935990804' },
      { level: 50, roleId: '422413848306253833' },
      { level: 60, roleId: '473647311658942464' },
      { level: 70, roleId: '498338692092395520' },
      { level: 80, roleId: '498338752767328275' },
      { level: 90, roleId: '498338798824849429' },
      { level: 100, roleId: '498338145327120415' },
    ];

    const rolesToAssign = levelRoles.filter((lr) => lr.level <= level);

    await interaction.deferReply();

    try {
      for (const role of rolesToAssign) {
        const roleToAdd = interaction.guild.roles.cache.get(role.roleId);
        if (!roleToAdd) continue;

        await targetUser.roles.add(roleToAdd);
      }

      await interaction.editReply({
        content: `Todas as roles até ao nível \`${level}\` foram devolvidas a **${targetUser.displayName}**`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: 'There was an error assigning the roles.' });
    }
  },
};
