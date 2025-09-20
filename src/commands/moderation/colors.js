const {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const colorNames = [
  'lightcoral',
  'salmon',
  'lightsalmon',
  'crimson',
  'red',
  'firebrick',
  'darkred',
  'coral',
  'tomato',
  'orangered',
  'orange',
  'goldenrod',
  'gold',
  'yellow',
  'khaki',
  'moccasin',
  'chocolate',
  'brown',
  'maroon',
  'mistyrose',
  'pink',
  'hotpink',
  'deeppink',
  'mediumvioletred',
  'palevioletred',
  'violet',
  'mediumorchid',
  'fuchsia',
  'darkviolet',
  'purple',
  'indigo',
  'greenyellow',
  'lawngreen',
  'lime',
  'limegreen',
  'palegreen',
  'green',
  'cyan',
  'turquoise',
  'aquamarine',
  'lightblue',
  'deepskyblue',
  'dodgerblue',
  'royalblue',
  'blue',
  'midnightblue',
  'lavender',
  'gray',
  'black',
  'white',
  'magmabloom',
  'peachylove',
  'goldenflame',
  'sunsetspark',
  'bluehorizon',
  'deepdive',
  'mysticgrove',
  'seafoamlight',
  'greenpulse',
  'springenergy',
  'cottoncandy',
  'blushmint',
  'honeyrose',
  'midnightglacier',
  'crimsonnight',
  'toxicnight',
  'neoneclipse',
  'nebuladrift',
  'cybergold',
];

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName('colors').setDescription('Send colors embed'),
  async execute(interaction) {
    if (!interaction.member.roles.cache.has('366276830795399168')) {
      return interaction.reply({ content: 'Não tens permissões para usar este comando.', ephemeral: true });
    }

    const channel = interaction.client.channels.cache.get('849409233199824947');

    const embed = new EmbedBuilder()
      .setTitle('🎨 Lista de Cores')
      .setColor('BFFFF2')
      .addFields(
        {
          name: '🔥 Cores Quentes 🔥',
          value:
            '<@&873005580455911444> | `LightCoral`\n<@&873005717450264657> | `Salmon`\n<@&873005870773043220> | `LightSalmon`\n<@&873005961265176578> | `Crimson`\n<@&873006052227026994> | `Red`\n<@&873006109814841405> | `FireBrick`\n<@&873006189414322197> | `DarkRed`\n<@&873006249342545941> | `Coral`\n<@&873006388635373639> | `Tomato`\n<@&873006454041350164> | `OrangeRed`\n<@&873006527529754624> | `Orange`\n<@&873006590356234270> | `GoldenRod`\n<@&873009181974732830> | `Gold`\n<@&873009282373791785> | `Yellow`\n<@&873009522510290954> | `Khaki`\n<@&873009389995429898> | `Moccasin`\n<@&873006658605948998> | `Chocolate`\n<@&873006725605777410> | `Brown`\n<@&873006788155428945> | `Maroon`\n<@&873009785493131335> | `MistyRose`\n<@&873006848280756236> | `Pink`\n<@&873006922788405338> | `HotPink`\n<@&873007144264400996> | `DeepPink`\n<@&873007218830741555> | `MediumVioletRed`\n<@&873007286862368839> | `PaleVioletRed`\n\u200B',
          inline: true,
        },
        {
          name: '❄️ Cores Frias ❄️',
          value:
            '<@&873007353241419796> | `Violet`\n<@&873007556421906512> | `MediumOrchid`\n<@&873007427379929119> | `Fuchsia`\n<@&873007628031254558> | `DarkViolet`\n<@&873007698499760128> | `Purple`\n<@&873007783568629781> | `Indigo`\n<@&873007882965254216> | `GreenYellow`\n<@&873007967061041202> | `LawnGreen`\n<@&873008043258937354> | `Lime`\n<@&873008124146090066> | `LimeGreen`\n<@&873008219994353744> | `PaleGreen`\n<@&873008317021175829> | `Green`\n<@&873008389452599337> | `Cyan`\n<@&873008604628807721> | `Turquoise`\n<@&873008519908057139> | `Aquamarine`\n<@&873008698820280392> | `LightBlue`\n<@&873008779116052491> | `DeepSkyBlue`\n<@&873008858925240340> | `DodgerBlue`\n<@&873008936977051708> | `RoyalBlue`\n<@&873009020326256651> | `Blue`\n<@&873009095416893500> | `MidnightBlue`\n<@&873009678504849511> | `Lavender`\n<@&873009868603285564> | `Gray`\n<@&849487788809519174> | `Black`\n<@&873009595642175539> | `White`',
          inline: true,
        },
        {
          name: '🌈 Cores Degradê 🌈 **(Boosters Only)**',
          value:
            '<@&1384978844439806124> | `MagmaBloom`\n<@&1384979605194014771> | `PeachyLove`\n<@&1384979454069309532> | `GoldenFlame`\n<@&1384980120514855002> | `SunsetSpark`\n<@&1384980502364295298> | `BlueHorizon`\n<@&1384980679829491822> | `DeepDive`\n<@&1384981382761021510> | `MysticGrove`\n<@&1384980808288440502> | `SeafoamLight`\n<@&1384981763847094422> | `GreenPulse`\n<@&1384990033416818709> | `SpringEnergy`\n<@&1384990284835979265> | `CottonCandy`\n<@&1384990511571669135> | `BlushMint`\n<@&1384990759475744768> | `HoneyRose`\n<@&1384991151437910211> | `MidnightGlacier`\n<@&1384991289204015215> | `CrimsonNight`\n<@&1419013246257729536> | `ToxicNight`\n<@&1419014753224884315> | `NeonEclipse`\n<@&1419023288352378940> | `NebulaDrift`\n<@&1419021584685076643> | `CyberGold`',
        }
      )
      .setFooter({ text: '👇CLICA NO BOTÃO E ESCOLHE A TUA COR!👇' });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('warm_colors').setLabel('🔥Cores Quentes🔥').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('cool_colors').setLabel('❄️Cores Frias❄️').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('gradient_colors').setLabel('🌈Cores Degradê🌈').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('remove_color').setLabel('🗑️Remover cor atual').setStyle(ButtonStyle.Danger)
    );

    await channel.send({
      embeds: [embed],
      components: [row],
    });
    return interaction.reply({ content: 'Embed foi enviado com sucesso! ✅', ephemeral: true });
  },

  // Handling Button Interactions for Color Selection
  async handleButton(interaction) {
    if (
      !interaction.member.roles.cache.has('459119370359013376') &&
      interaction.customId !== 'gradient_colors' &&
      interaction.customId !== 'remove_color'
    ) {
      return interaction.reply({
        content:
          "**__Precisas de nível 5 para escolheres uma cor!__**\nSe ainda não sabes como chegar a nível 5, visita a sala <#804467403546165268> onde tens um pequeno 'faq' para entenderes como tudo funciona.",
        ephemeral: true,
      });
    }
    if (
      interaction.customId === 'gradient_colors' &&
      !interaction.member.roles.cache.has('589505228777324566') && // booster
      !interaction.member.roles.cache.has('498606831967404044') // moderator
    ) {
      return interaction.reply({
        content:
          '**__Precisas de ser booster para escolheres uma cor degradê!__**\nVisita a sala <#706960491855085680> para saberes todas as vantagens de impulsionar o servidor.',
        ephemeral: true,
      });
    }
    if (interaction.customId === 'warm_colors') {
      const warmColorMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_warm_color')
          .setPlaceholder('Escolhe uma cor quente')
          .addOptions([
            { label: 'LightCoral', value: 'lightcoral' },
            { label: 'Salmon', value: 'salmon' },
            { label: 'LightSalmon', value: 'lightsalmon' },
            { label: 'Crimson', value: 'crimson' },
            { label: 'Red', value: 'red' },
            { label: 'FireBrick', value: 'firebrick' },
            { label: 'DarkRed', value: 'darkred' },
            { label: 'Coral', value: 'coral' },
            { label: 'Tomato', value: 'tomato' },
            { label: 'OrangeRed', value: 'orangered' },
            { label: 'Orange', value: 'orange' },
            { label: 'GoldenRod', value: 'goldenrod' },
            { label: 'Gold', value: 'gold' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Khaki', value: 'khaki' },
            { label: 'Moccasin', value: 'moccasin' },
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Brown', value: 'brown' },
            { label: 'Maroon', value: 'maroon' },
            { label: 'MistyRose', value: 'mistyrose' },
            { label: 'Pink', value: 'pink' },
            { label: 'HotPink', value: 'hotpink' },
            { label: 'DeepPink', value: 'deeppink' },
            { label: 'MediumVioletRed', value: 'mediumvioletred' },
            { label: 'PaleVioletRed', value: 'palevioletred' },
          ])
      );

      await interaction.reply({
        content: '## Escolhe uma cor quente:',
        components: [warmColorMenu],
        ephemeral: true,
      });
    } else if (interaction.customId === 'cool_colors') {
      const coolColorMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_cool_color')
          .setPlaceholder('Escolhe uma cor fria')
          .addOptions([
            { label: 'Violet', value: 'violet' },
            { label: 'MediumOrchid', value: 'mediumorchid' },
            { label: 'Fuchsia', value: 'fuchsia' },
            { label: 'DarkViolet', value: 'darkviolet' },
            { label: 'Purple', value: 'purple' },
            { label: 'Indigo', value: 'indigo' },
            { label: 'GreenYellow', value: 'greenyellow' },
            { label: 'LawnGreen', value: 'lawngreen' },
            { label: 'Lime', value: 'lime' },
            { label: 'LimeGreen', value: 'limegreen' },
            { label: 'PaleGreen', value: 'palegreen' },
            { label: 'Green', value: 'green' },
            { label: 'Cyan', value: 'cyan' },
            { label: 'Turquoise', value: 'turquoise' },
            { label: 'LightBlue', value: 'lightblue' },
            { label: 'DeepSkyBlue', value: 'deepskyblue' },
            { label: 'DodgerBlue', value: 'dodgerblue' },
            { label: 'RoyalBlue', value: 'royalblue' },
            { label: 'Blue', value: 'blue' },
            { label: 'MidnightBlue', value: 'midnightblue' },
            { label: 'Lavender', value: 'lavender' },
            { label: 'Gray', value: 'gray' },
            { label: 'Black', value: 'black' },
            { label: 'White', value: 'white' },
          ])
      );

      await interaction.reply({
        content: '## Escolhe uma cor fria:',
        components: [coolColorMenu],
        ephemeral: true,
      });
    } else if (interaction.customId === 'gradient_colors') {
      const gradientColorMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_gradient_color')
          .setPlaceholder('Escolhe uma cor degradê')
          .addOptions([
            { label: 'MagmaBloom', value: 'magmabloom' },
            { label: 'PeachyLove', value: 'peachylove' },
            { label: 'GoldenFlame', value: 'goldenflame' },
            { label: 'SunsetSpark', value: 'sunsetspark' },
            { label: 'BlueHorizon', value: 'bluehorizon' },
            { label: 'DeepDive', value: 'deepdive' },
            { label: 'MysticGrove', value: 'mysticgrove' },
            { label: 'SeafoamLight', value: 'seafoamlight' },
            { label: 'GreenPulse', value: 'greenpulse' },
            { label: 'SpringEnergy', value: 'springenergy' },
            { label: 'CottonCandy', value: 'cottoncandy' },
            { label: 'BlushMint', value: 'blushmint' },
            { label: 'HoneyRose', value: 'honeyrose' },
            { label: 'MidnightGlacier', value: 'midnightglacier' },
            { label: 'CrimsonNight', value: 'crimsonnight' },
            { label: 'ToxicNight', value: 'toxicnight' },
            { label: 'NeonEclipse', value: 'neoneclipse' },
            { label: 'NebulaDrift', value: 'nebuladrift' },
            { label: 'CyberGold', value: 'cybergold' },
          ])
      );

      await interaction.reply({
        content: '## Escolhe uma cor degradê:',
        components: [gradientColorMenu],
        ephemeral: true,
      });
    } else if (interaction.customId === 'remove_color') {
      const currentColorRoles = interaction.member.roles.cache.filter((r) => colorNames.includes(r.name.toLowerCase()));

      if (currentColorRoles.size > 0) {
        for (const colorRole of currentColorRoles.values()) {
          await interaction.member.roles.remove(colorRole);
        }
        return interaction.reply({ content: 'A tua cor foi removida!', ephemeral: true });
      } else return interaction.reply({ content: 'Não tens nenhuma cor para remover oh burro!', ephemeral: true });
    }

    try {
      const selectMenuInteraction = await interaction.channel.awaitMessageComponent({
        filter: (i) =>
          i.user.id === interaction.user.id &&
          (i.customId === 'select_warm_color' ||
            i.customId === 'select_cool_color' ||
            i.customId === 'select_gradient_color'),
        time: 60000,
      });

      // Handle the selection
      const selectedColor = selectMenuInteraction.values[0];
      const role = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === selectedColor);
      const currentColorRoles = interaction.member.roles.cache.filter((r) => colorNames.includes(r.name.toLowerCase()));

      // Remove existing roles
      if (currentColorRoles.size > 0) {
        for (const colorRole of currentColorRoles.values()) {
          await interaction.member.roles.remove(colorRole);
        }
      }

      // Add the selected role
      if (role) {
        await interaction.member.roles.add(role);
        await selectMenuInteraction.update({
          content: `A cor **${role.name}** foi adicionada!`,
          components: [],
          ephemeral: true,
        });
      } else {
        await selectMenuInteraction.update({ content: 'Cargo não encontrado!', components: [], ephemeral: true });
      }
    } catch (error) {
      console.error('Erro ao esperar a interação do select menu:', error);
    }
  },
};
