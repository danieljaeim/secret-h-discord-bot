const Discord = require('discord.js');

module.exports = createLobbyEmbed = (author, playerlist) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Secret Hitler Lobby`)
	.setDescription(`The secret hitler game hosted by ${author} starts soon. React to this post with a '👍' to join the game. Once at least 5 people react, the host can begin the game by reacting with a ✅`)
	.addField(
		"Players", playerlist.length > 0 ? playerlist.join(' \n') : 'No players in the lobby', true
	)