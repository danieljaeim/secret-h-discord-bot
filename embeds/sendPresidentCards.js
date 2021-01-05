const Discord = require('discord.js');

var emojibank = ['1️⃣', '2️⃣', '3️⃣'];

module.exports = sendPresidentCardsEmbed = (president, cards) => {
    return {
        color: 0x0099ff,
        title: `Hello ${president.username}. Please choose the card you wish to discard.`,
        description: 'The other two cards shall be sent to the chancellor for final deliberation.',
        fields: cards.map((c, i) => {            
            return {
                name: `Card ${i}: ${c == "L" ? "Liberal" : "Fascist"}`,
                value: emojibank[i],
                inline: true
            }
        })
    }
}