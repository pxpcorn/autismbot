const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('pedo')
        .setDescription('Mede o nível de pedofilia')
        .addUserOption(option => option.setName('user').setDescription('escolhe um membro')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        if (user.bot)
            return await interaction.reply(`${interaction.user}, eu não papo crianças como tu. <:g_PepeFu:596803990365405219>`);

        if (user === interaction.user) {
            await interaction.reply(`${user}, o teu nível de pedofilia é de \`${Math.floor(Math.random() * 100)}%\` <:z_Viper:695376421467586581>`);
        } else {
            await interaction.reply(`${interaction.user}, o nível de pedofilia de **${member.displayName}** é de \`${Math.floor(Math.random() * 100)}%\` <:z_Viper:695376421467586581>`);
        }
    }
}