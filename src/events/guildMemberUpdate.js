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

const bioRoleId = '1276998449753096253';

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
  },
};
