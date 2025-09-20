const { Events } = require('discord.js');

const bioRoles = [
  '551616206587822091',
  '551616323768287243',
  '1060624005784162384',
  '551616395868241952',
  '551616469373550592',
  '551616531524616193',
  '551616603989475338',
  '551616666887389184',
  '551616753474732046',
  '551616814786805780',
  '1060623234279677952',
  '849657858912288819',
  '846460790114615306',
  '1099106155516661915',
  '498327060272513034',
];

const colorRoles = [
  '1384978844439806124',
  '1384979605194014771',
  '1384979454069309532',
  '1384980120514855002',
  '1384980502364295298',
  '1384980679829491822',
  '1384981382761021510',
  '1384980808288440502',
  '1384981763847094422',
  '1384990033416818709',
  '1384990284835979265',
  '1384990511571669135',
  '1384990759475744768',
  '1384991151437910211',
  '1384991289204015215',
  '1419013246257729536',
  '1419014753224884315',
  '1419023288352378940',
  '1419021584685076643',
];

const bioRoleId = '1276998449753096253';
const boosterId = '589505228777324566';
const modId = '498606831967404044';

module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    const hasBioRole = newMember.roles.cache.has(bioRoleId);
    const hasAnyBioRoles = bioRoles.some((roleId) => newMember.roles.cache.has(roleId));

    if (hasAnyBioRoles) {
      if (!hasBioRole) {
        try {
          await newMember.roles.add(bioRoleId);
        } catch (error) {
          console.error('Error adding bio role');
        }
      }
    } else {
      if (hasBioRole) {
        try {
          await newMember.roles.remove(bioRoleId);
        } catch (error) {
          console.error('Error removing bio role');
        }
      }
    }

    const isBooster = newMember.roles.cache.has(boosterId);
    const isMod = newMember.roles.cache.has(modId);
    const hasAnyColor = colorRoles.some((roleId) => newMember.roles.cache.has(roleId));

    if (hasAnyColor && !isBooster && !isMod) {
      try {
        const rolesToRemove = colorRoles.filter((roleId) => newMember.roles.cache.has(roleId));

        await newMember.roles.remove(rolesToRemove);
      } catch (error) {
        console.error('Erro ao remover roles de cor:', error);
      }
    }
  },
};
