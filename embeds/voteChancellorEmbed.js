const Discord = require('discord.js');

let emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
let randomremark = ['(very cool)']


module.exports = createVoteChancellorEmbed = (gamestate) => {
    return {
        color: 0x0099ff,
        title: `*The President Is Making a Decision*`,
        description: `*${gamestate.president}*, you are president now!   \n` +
        `Select your chancellor by reacting below.\n\n...*only ${gamestate.president.username} can decide*`
        + (gamestate.lastChancellor.username !== undefined ? ` You may not choose ${gamestate.lastChancellor.username} or ${gamestate.lastPresident.username} as they were elected last round.` : ''),
        fields: gamestate.players.filter(p => p.username !== gamestate.president.username && p.username != gamestate.lastChancellor.username).map((p, i) => {            
            return {
                name: p.username, 
                value: emojibank[i],
                inline: true
            }
        })
    }
}