const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = whichCardEmbed = (isLiberal) => new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(`${isLiberal ? 'A Liberal Card was Placed' : 'A Fascist Card was Placed'}`)
    .attachFiles([isLiberal ? './img/liberal_card.png' : './img/fascist_card.png'])
    .setThumbnail(`attachment://${isLiberal ? 'liberal_card.png' : 'fascist_card.png'}`)
    
    // maybe an indicator of the number of people currently on the game