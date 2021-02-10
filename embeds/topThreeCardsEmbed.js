const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = topThreeCardsEmbed = (gamestate) => {
	
    let topCards = gamestate.deck.slice(0, 3);
	
	return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Top three cards of the deck!`)
        .addFields(
            topCards.map(c => {
                return {
                    name: `Card 1: ${c == "L" ? "Liberal" : "Fascist"}`,
                    value: c != "L" ? '🟥' : '🟦',
                    inline: true
                }
            })
        )
}
    
    // maybe an indicator of the number of people currently on the game