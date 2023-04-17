const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'send') return;

  const messageContent = interaction.options.getString('message');
  const targetRole = interaction.options.getRole('role');
  const guildMembers = targetRole ?
    targetRole.members.filter(member => member.id !== interaction.user.id) :
    interaction.guild.members.cache.filter(member => member.id !== interaction.user.id);

  const recipientMentions = targetRole ?
    `@${targetRole.name}: ` :
    '';

  guildMembers.forEach(async member => {
    await member.send(`${recipientMentions}${interaction.user.username} sent: ${messageContent}`);
  });

  const replyEmbed = new MessageEmbed()
    .setColor('GREEN')
    .setDescription(`Message sent!`);
  await interaction.reply({ embeds: [replyEmbed] });
});

client.login('your-bot-token');
