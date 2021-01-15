const Discord = require('discord.js');

/** secret-hitler-img */

var emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = presidentInvestigationEmbed = (gamestate, target={username: null}, players, edited) => new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(edited ? `President ${gamestate.president.username} can investigate another player` :
    `President ${gamestate.president.username} has chosen to investigate ${target.username}`)
    .setDescription(`${edited ? gamestate.president + ', choose a player below to learn about their *party affiliation*' 
    : gamestate.president} has chosen to investigate ${target}. President, check ${gamestate.client.user}.`)
    .addFields(
        players.map((p, i) => {
            return {
                name: p.username,
                value: emojibank[i], 
                inline: true
            }
        })
    )
    
    // maybe an indicator of the number of people currently on the game