const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = roleNotificationEmbed = (gamestate, edited) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${edited ? 'Your game will begin shortly' : `Roles have been assigned by via direct message`}`) // might be nice to tag the bot here
    .setDescription(`Find your faction via ${gamestate.client.user}`)
    .addField('Liberal Victory Conditions', '• Place down **5 Liberal Policies**. \n • *Kill* Hitler.', true)
    .addField('Fascist/Hitler Victory Conditions', '• Place down **6 Fascist Policies**. \n • *Elect* Hitler as *Chancellor*, after placing **3 Fascist Policies**', true)
    .setFooter(`Fascist Board Legend: PI: President investigates a player\'s role\nPE: President examines top 3 cards on the deck\nPP: President picks the next president\nPK: President kills another player.`)
    
    // maybe an indicator of the number of people currently on the game