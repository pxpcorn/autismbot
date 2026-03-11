const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('embed').setDescription('Send embed message'),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has('366276830795399168')) {
      return interaction.reply({ content: 'Não tens permissões para usar este comando.', ephemeral: true });
    }

    const infoChannel = interaction.client.channels.cache.get('804467403546165268');

    const embed = new EmbedBuilder()
      .setColor('#00FFFF')
      .setImage('https://i.imgur.com/tx6DDbS.png')
      .setFooter({ text: 'Bem-vindo ao Autism™' });

    const embed2 = new EmbedBuilder()
      .setColor('B9FF66')
      .setTitle('<a:g_PepeHat:1241409438456348695> Sobre o servidor <a:g_PepeHat:1241409438456348695>')
      .setDescription(
        'O **Autism™** foi fundado a 7 de Outubro de 2017 com o intuito de criar um espaço onde as pessoas pudessem conviver fugindo um pouco às típicas regras chatas que outros servidores costumam impor.\n\nÉ um servidor super relaxado e exige o mínimo de sentido de humor se procuras integrar-te nesta família. Foi considerado durante muitos anos o maior e mais ativo servidor português e procuramos sempre tentar manter esse estatuto.\n\n\n**__BEM-VINDO AO MELHOR SERVIDOR DE PORTUGAL!__**'
      )
      .setImage(interaction.guild.iconURL());

    const embed3 = new EmbedBuilder().setColor('#00FFFF').setImage('https://i.imgur.com/LijSBdH.png');

    const embed4 = new EmbedBuilder()
      .setColor('B9FF66')
      .setTitle('<:g_PepeTOS:816865612448923651> RULES <:g_PepeTOS:816865612448923651>')
      .setDescription(
        'Apesar de ser um server muito liberal, é preciso ter algum senso comum para mantermos a organização no nosso servidor.\n\n\n**__REGRAS BÁSICAS DE FUNCIONAMENTO:__**\n\n❗**Proibido conteúdo NSFW!**\n\n❗**Probido double accounts!**\n\n❗**Proibido qualquer tentativa de burla ou roubo de informação!**\n\n❗**Não expôr informação privada e pessoal de outra pessoa!**\n\n❗**Ear rapes propositados vão resultar em voice mute ou ban!**\n\n❗**Não spamem a tag da Staff sem necessidade!**\n\n❗**Não sejam pussies!\n\n**'
      )
      .setFooter({ text: 'O Autism™ segue obrigatoriamente todas as Community Guidelines do ToS do Discord.' });

    const embed5 = new EmbedBuilder().setColor('#00FFFF').setImage('https://i.imgur.com/0nxIHmU.png');

    const embed6 = new EmbedBuilder()
      .setColor('B9FF66')
      .setTitle('<a:g_dancinha:813480068097376327> ROLES INFO <a:g_dancinha:813480068097376327>')
      .setDescription(
        'Para além dos cargos iniciais a que és apresentado quando entras, o servidor conta ainda com imensas outras roles que podes obter e um sistema de ranking do bot **Arcane**.\n\n**__STAFF TEAM__** <:moderator:1294443366775263362>\n\n**<@&366276830795399168> - <@362259065801277440>**\nFundador extremamente sensual do **Autism™**.\n\n**<@&498606831967404044> - <@641777615237283851> | <@487043511225679899> | <@830378803053592606>**\nEquipa de moderadores do servidor.\n\n\n**__REWARD ROLES__** <:g_peperose:813479937742864396>\n\n**<@&589505228777324566> - Boosters do servidor. Visita a sala <#706960491855085680> para saberes as vantagens de impulsionar o servidor.**\n\n**<@&693883935087788165>┃<@&1102351036334747738> - Receberás estas roles se tiveres 100 mensagens ou 10h de voice nos últimos 7 dias.**\n\n**__(Poderás precisar destas roles para poderes participar em giveaways)__**\n\n\n**__RANKING ROLES__** <a:g_hacker:593474871993040918>\n\n**<@&459119370359013376> - Nível 5**\n**<@&422411712428245007> - Nível 10**\n**<@&473597175935533056> - Nível 20**\n**<@&498338620936028160> - Nível 30**\n**<@&422409041935990804> - Nível 40**\n**<@&422413848306253833> - Nível 50**\n**<@&473647311658942464> - Nível 60**\n**<@&498338692092395520> - Nível 70**\n**<@&498338752767328275> - Nível 80**\n**<@&498338798824849429> - Nível 90**\n**<@&498338145327120415> - Nível 100**\n\n**__Ganhas XP a escrever no chat e a falar nos voice channels.__**\n\n\n**Temos ainda Color Roles que podes encontrar aqui: <#849409233199824947>**'
      );

    await infoChannel.send({ embeds: [embed, embed2, embed3, embed4, embed5, embed6] });
    return interaction.reply('Embed foi enviado com sucesso! ✅');
  },
};
