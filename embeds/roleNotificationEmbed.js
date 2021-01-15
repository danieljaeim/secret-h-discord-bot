const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = roleNotificationEmbed = (gamestate, edited) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${edited ? 'Your game will begin shortly' : `Roles have been assigned by via direct message`}`) // might be nice to tag the bot here
    .setDescription(`You've been given your roles through direct message via ${gamestate.client.user}`)
    .addField('Liberal Victory Conditions', '• Place **5** liberal policies on the board. \n • Kill Hitler.')
    .addField('Fascist/Hitler Victory Conditions', '• Place **6** fascist policies on the board. \n • Elect Hitler as Chancellor, *with at least 3 fascist policies on the board*.')
    .addField('Legend for Fascist Board', `PI: President investigates a player\'s role\n PE: President examines top 3 cards on the deck 
    PP: President picks the next president\n PK: President kills another player.`, false)
    
    // maybe an indicator of the number of people currently on the game