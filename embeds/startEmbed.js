const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = createStartEmbed = (author, channel) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Secret Hitler Starting!`)
	.setAuthor(author.username, 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription(`A secret hitler game is starting in the ${channel} text channel. Join the lobby and the host will begin!`)
    .setThumbnail('https://i.imgur.com/1jE7uUZ.jpg')
    
    // maybe an indicator of the number of people currently on the game