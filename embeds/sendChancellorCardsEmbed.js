const Discord = require('discord.js');

var emojibank = ['1️⃣', '2️⃣'];

module.exports = sendPresidentCardsEmbed = (chancellor, cards) => {
    return {
        color: 0x0099ff,
        title: `Hello ${chancellor.username}. Please choose the card you wish to place as a policy!`,
        description: 'The card you choose shall be placed on the board!',
        fields: cards.map((c, i) => {            
            return {
                name: `Card ${i}: ${c == "L" ? "Liberal" : "Fascist"}`,
                value: emojibank[i],
                inline: true
            }
        })
    }
}