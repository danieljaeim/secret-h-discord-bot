const Discord = require('discord.js');

/** secret-hitler-img */

var emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = presidentPickingNotificationEmbed = (gamestate, target, edited) => new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(edited ? `President ${gamestate.president.username} is picking the next player` :
    `President ${gamestate.president.username} has chosen ${target.username} as President!`)
    .setDescription(`${gamestate.president}, choose the next person below that you'd like to be president.`)
    .addFields(
        gamestate.players.map((p, i) => {
            return {
                name: p.username,
                value: emojibank[i], 
                inline: true
            }
        })
    )
    
    // maybe an indicator of the number of people currently on the game