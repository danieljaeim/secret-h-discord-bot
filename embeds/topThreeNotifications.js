const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = topThreeNotifications = (gamestate) => new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(`President ${gamestate.president.username} knows the top 3 cards on the deck.`)
    .setDescription(`** ${gamestate.president.username}, check your direct messages from ${gamestate.client.user}`)
    // maybe an indicator of the number of people currently on the game