const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('boobs')
        .setDescription('Mede o mamaçal')
        .addUserOption(option => option.setName('user').setDescription('escolhe um membro')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const options = [
            "Copa A",
            "Copa B",
            "Copa C",
            "Copa D",
            "Copa E",
            "Copa F",
            "Copa G",
            "Copa H",
            "Copa I",
            "Copa J",
        ];
        const option = options[Math.floor(Math.random() * options.length)];

        if (user.bot)
            return await interaction.reply(`${interaction.user}, não possuo tetos mas podes mostrar os teus... <:g_PepeRape:372865749200535554>`);

        if (user.id === '487043511225679899')
            return await interaction.reply('**ERROR!** No mamas found.');

        if (user === interaction.user) {
            await interaction.reply(`${user}, bons tetos... tu és \`${option}\` <:r_Devil:816867865512247346>`);
        } else {
            await interaction.reply(`${interaction.user}, o tamanho das mamas de **${member.displayName}** é \`${option}\` <:r_Devil:816867865512247346>`);
        }
    }
}