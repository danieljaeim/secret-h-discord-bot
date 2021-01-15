const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = hitlerWasSlain = (gamestate) => new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Hitler was slain! Shot by ${gamestate.president.name}.`)
	.setDescription(`The Fascists have lost their leader, the liberals have won!`);
    
    // maybe an indicator of the number of people currently on the game