const { Events, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');
const path = require('path');

function getOrdinalSuffix(num) {
  const mod100 = num % 100;
  const mod10 = num % 10;

  if (mod100 >= 11 && mod100 <= 13) {
    return 'th';
  }

  switch (mod10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

const applyText = (canvas, text) => {
  const context = canvas.getContext('2d');
  let fontSize = 60;

  do {
    context.font = `bold ${(fontSize -= 2)}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);

  return context.font;
};

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const channel = member.guild.channels.cache.get('947580770866827315');
    if (!channel) return;

    const canvas = Canvas.createCanvas(1000, 300);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(path.join(__dirname, '..', '..', 'resources', 'welcome.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg' }));
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 150, 110, 0, Math.PI * 2, true);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 40, 40, 220, 220);
    ctx.restore();

    const suffix = getOrdinalSuffix(member.guild.memberCount);
    ctx.font = applyText(canvas, `Welcome to Autism™\n@${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`Welcome to Autism™\n@${member.displayName}!`, 635, 135);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-image.png' });

    channel.send({
      content: `Bem-vindo(a) <@${member.id}>, és o **${member.guild.memberCount}${suffix}** membro do **${member.guild.name}!** <a:c_dance:525378656756039680>`,
      files: [attachment],
    });
  },
};
