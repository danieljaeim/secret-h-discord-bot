const Discord = require('discord.js');


module.exports = createLobbyEmbed = (author, playerlist) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Secret Hitler Lobby`)
	.setDescription(`React to this post with a '👍' to join this game. \n\n At least 5 players must join before ${author} may begin the game.`
	+ (playerlist.length >= 5 ? `\n\n **${author}, begin the game by clicking ✅**` : ''))
	.addField(
		"Players", playerlist.length > 0 ? playerlist.join(' \n') : 'No players in the lobby', true
	)