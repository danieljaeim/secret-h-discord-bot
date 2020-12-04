const Discord = require('discord.js');

module.exports = createLobbyEmbed = (username, channel) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Secret Hitler Lobby`)
	.setDescription(`The secret hitler game hosted by ${username} starts soon. React to this post, and once at least 5 people join, the game will begin!`)