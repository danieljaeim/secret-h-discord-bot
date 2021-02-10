const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = topThreeNotifications = (gamestate, edited) => new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(edited ? `President ${gamestate.president.username} has been shown the **Top 3 Policies** on the deck.` : 'A Presidential Event has been triggered!')
    .setDescription(`${gamestate.president}. the cards have been sent via ${gamestate.client.user}`)
    // maybe an indicator of the number of people currently on the game