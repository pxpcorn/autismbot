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
        'O **Autism™** foi fundado a 7 de Outubro de 2017 com o intuito de criar um espaço onde as pessoas pudessem conviver fugindo um pouco às típicas regras chatas que outros servidores costumam impor.\n\nÉ um servidor super relaxado e exige o mínimo de sentido de humor se procuras integrar-te nesta família. Foi considerado durante muitos anos o servidor mais ativo de Portugal e procuramos sempre tentar manter esse estatuto.\n\n\n**__BEM-VINDO AO MELHOR SERVIDOR DE PORTUGAL!__**\n\n\n🔗 **__OFFICIAL LINKS__**\n<:discord:1294435815413383179> **Invite:** https://discord.gg/autismcrew\n<:tiktok:1294436716488425482> **TikTok:** https://www.tiktok.com/@discordtuga\n<:instagram:1294437959877267476> **Instagram:** https://www.instagram.com/discordtuga\n<:youtube:1294436717818019860> **Youtube:** https://www.youtube.com/@discordtuga'
      );

    const embed3 = new EmbedBuilder().setColor('#00FFFF').setImage('https://i.imgur.com/LijSBdH.png');

    const embed4 = new EmbedBuilder()
      .setColor('B9FF66')
      .setTitle('<:g_PepeTOS:816865612448923651> RULES <:g_PepeTOS:816865612448923651>')
      .setDescription(
        'Apesar de ser um server muito liberal, é preciso respeitar alguns pontos cruciais para mantermos a organização no nosso servidor.\n\n\n**__REGRAS BÁSICAS DE FUNCIONAMENTO:__**\n\n❗**Sem conteúdo NSFW!** Não é permitido pornografia, gore ou imagens de crueldade animal. Imagens para prazer sádico e glorificação de violência será igualmente punido.\n❗**Não expôr informação privada e pessoal de outra pessoa sem o seu consentimento** (morada, número de telemóvel, redes sociais, fotografias, etc..)\n❗**Não sejam demasiado autistas com os novos membros.** Eles podem não perceber que estão a brincar.\n❗**Proibído qualquer tipo de assédio grave** (Blackmailing, Cyberbullying, DM spamming, etc..).\n❗**Não é permitido double accounting.** Contas fakes serão banidas de imediato.\n❗**Respeita todos os moderadores.** Se não concordares com alguma ação da Staff, manda mensagem privada ao Admin.\n❗**Sem scam ou IP loggers.** Colocar um link na tentativa de roubar informação privada vai resultar num ban imediato.\n❗**Reduz qualquer barulho de fundo irritante.** Se não for possível, por favor usa o Push-to-Talk. Ear rapes propositados vão resultar em voice mute.\n❗**Não spamem a tag da Staff sem necessidade.**\n❗**Instant bans serão dados se:** Tentares dar raid, spamares invites por DM, etc.\n❗**Não sejam pussies.** Tenham senso comum para perceber humor e sarcasmo.'
      )
      .setFooter({ text: 'O Autism™ segue obrigatoriamente todas as Community Guidelines do ToS do Discord.' });

    const embed5 = new EmbedBuilder().setColor('#00FFFF').setImage('https://i.imgur.com/0nxIHmU.png');

    const embed6 = new EmbedBuilder()
      .setColor('B9FF66')
      .setTitle('<a:g_dancinha:813480068097376327> ROLES INFO <a:g_dancinha:813480068097376327>')
      .setDescription(
        'Para além dos cargos iniciais a que és apresentado quando entras, o servidor conta ainda com imensas outras roles que podes obter e um sistema de ranking do bot **Arcane**.\n\n**__STAFF TEAM__** <:moderator:1294443366775263362>\n\n**<@&366276830795399168> - <@362259065801277440>**\nFundador extremamente sensual do **Autism™**.\n\n**<@&498606831967404044> - <@641777615237283851> | <@487043511225679899> | <@830378803053592606> | <@909049486263844864>**\nEquipa de moderadores do servidor.\n\n\n**__REWARD ROLES__** <:g_peperose:813479937742864396>\n\n**<@&589505228777324566> - Boosters do servidor. Visita a sala <#706960491855085680> para saberes as vantagens de impulsionar o servidor.**\n\n**<@&459769256221999114> - Receberás automaticamente esta role sempre que entrares em live na Twitch.**\n\n**<@&693883935087788165>┃<@&1102351036334747738> - Receberás estas roles se tiveres 100 mensagens ou 10h de voice nos últimos 7 dias.**\n\n**__(Poderás precisar destas roles para poderes participar em giveaways)__**\n\n\n**__RANKING ROLES__** <a:g_hacker:593474871993040918>\n\n**<@&459119370359013376> - Nível 5**\n**<@&422411712428245007> - Nível 10**\n**<@&473597175935533056> - Nível 20**\n**<@&498338620936028160> - Nível 30**\n**<@&422409041935990804> - Nível 40**\n**<@&422413848306253833> - Nível 50**\n**<@&473647311658942464> - Nível 60**\n**<@&498338692092395520> - Nível 70**\n**<@&498338752767328275> - Nível 80**\n**<@&498338798824849429> - Nível 90**\n**<@&498338145327120415> - Nível 100**\n\n**__Ganhas XP a escrever no chat e a falar nos voice channels.__**\n\n\n**Temos ainda Color Roles que podes encontrar aqui: <#849409233199824947>**'
      );

    await infoChannel.send({ embeds: [embed, embed2, embed3, embed4, embed5, embed6] });
    return interaction.reply('Embed foi enviado com sucesso! ✅');
  },
};
