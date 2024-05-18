const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('simp')
        .setDescription('Mede a simparia')
        .addUserOption(option => option.setName('user').setDescription('escolhe um membro')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        if (user.bot)
            return await interaction.reply(`${interaction.user}, eu sou um bot oh burro! <:r_FacePalm:695376903279739004>`);

        if (user === interaction.user) {
            await interaction.reply(`${user}, o teu nível de simparia é de \`${Math.floor(Math.random() * 200)}%\` <:g_PepeSimp:695382371763224628>`);
        } else {
            await interaction.reply(`${interaction.user}, o nível de simparia de **${member.displayName}** é de \`${Math.floor(Math.random() * 100)}%\` <:g_PepeSimp:695382371763224628>`);
        }
    }
}