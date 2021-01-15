const Discord = require('discord.js');


module.exports = createLobbyEmbed = (author, playerlist) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Secret Hitler Lobby Starting Soon`)
	.setDescription(`React to this post with a '👍' to join the game. \n Once at least 5 people react, ${author} can begin by reacting with a ✅`)
	.addField(
		"Players", playerlist.length > 0 ? playerlist.join(' \n') : 'No players in the lobby', true
	)