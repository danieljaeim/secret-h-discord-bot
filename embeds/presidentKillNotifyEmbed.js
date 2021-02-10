const Discord = require('discord.js');

/** secret-hitler-img */

var emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = presidentKillNotify = (gamestate, nonPresidents, edited, target={username: null} ) => new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("Shooting the player **kills them**, *like you know... they die* ")
    .setTitle(!edited ? `President ${gamestate.president.username} can shoot a player...` :
    `President ${gamestate.president.username} has chosen to eliminate ${target.username}...`)
    .addFields(
        nonPresidents.map((p, i) => {
            return {
                name: p.username,
                value: emojibank[i], 
                inline: true
            }
        })
    )
    
    // maybe an indicator of the number of people currently on the game