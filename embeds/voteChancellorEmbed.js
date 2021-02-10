const Discord = require('discord.js');

let emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
let randomremark = ['(very cool)']


module.exports = createVoteChancellorEmbed = (gamestate) => {
    return {
        color: 0x0099ff,
        title: `*Presidential Election*`,
        description: `*${gamestate.president}* **is running for President**\n` +
        `They may select a **Chancellor** to run with\n\n`
        + (gamestate.lastChancellor.id !== undefined && gamestate.lastChancellor.id !== gamestate.president.id ? 
        `**${gamestate.lastChancellor.username + 
        (gamestate.players.length > 5 ? ' and ' + gamestate.lastPresident.username : '')} may not be re-elected.**` : ''),
        fields: gamestate.players.filter(p => p.id !== gamestate.president.id && p.id != gamestate.lastChancellor.id).map((p, i) => {            
            return {
                name: p.username, 
                value: emojibank[i],
                inline: true
            }
        })
    }
}