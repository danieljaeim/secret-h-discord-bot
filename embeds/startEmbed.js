const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = createStartEmbed = (username, channel) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Secret Hitler Starting!`)
	.setAuthor(username, 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription(`A secret hitler game is starting in the <#${channel.id}> text channel soon.`)
	.setThumbnail('https://i.imgur.com/1jE7uUZ.jpg')