const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = returnEmbed = (channel) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Thanks!`)
	.setDescription(`Return to the game channel - ${channel}`)
    
    // maybe an indicator of the number of people currently on the game