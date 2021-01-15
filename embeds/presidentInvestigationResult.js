const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = presidentInvestigateResult = (target) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${target.username} is a ${target.role == "L" ? "Liberal" : "Fascist"}`)