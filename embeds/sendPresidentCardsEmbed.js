const Discord = require('discord.js');

var emojibank = ['1️⃣', '2️⃣', '3️⃣'];

module.exports = sendPresidentCardsEmbed = (gamestate, cards) => {
    return {
        color: 0x0099ff,
        title: `*Discard* one policy.`,
        description: `The other two policies shall be sent to ${gamestate.chancellorCandidate} for final *deliberation*.`,
        fields: cards.map((c, i) => {            
            return {
                name: `Card ${i + 1}: ${c == "L" ? "Liberal 🟦" : "Fascist 🟥"}`,
                value: emojibank[i],
                inline: true
            }
        })
    }
}