const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = roleNotificationEmbed = (edited) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${edited ? 'Your game will begin shortly' : 'Roles have been assigned by Secret-Hitler-Bot'}`) // might be nice to tag the bot here
    .setDescription(`You've been given your roles through direct message.`)
    .addField('Liberal Victory Conditions', '• Place 5 liberal policies on the board. \n • Kill Hitler with the Presidential bullet.')
    .addField('Fascist/Hitler Victory Conditions', '• Place 6 fascist policies on the board. \n • Elect Hitler as Chancellor, with at least 3 fascist policies on the board.')
    
    // maybe an indicator of the number of people currently on the game