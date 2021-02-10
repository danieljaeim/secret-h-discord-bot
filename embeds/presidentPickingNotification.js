const Discord = require('discord.js');

/** secret-hitler-img */

var emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

module.exports = presidentPickingNotificationEmbed = (gamestate, nonPresidents, target, edited) => {

    let targetUsername = "";
    if (target) {
        targetUsername = target.username;
    }
    
    return new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(!edited ? `President ${gamestate.president.username} gets to choose the next Presidential Candidate` :
    `President ${gamestate.president.username} has chosen ${targetUsername.slice(0, 1).toUpperCase() 
        + targetUsername.slice(1).toLowerCase()}`)
    .setDescription(`${gamestate.president}, choose the next Presidential Candidatial Candidate.`)
    .addFields(
        nonPresidents.map((p, i) => {
            return {
                name: p.username,
                value: emojibank[i], 
                inline: true
            }
        })
    )
}
    
    // maybe an indicator of the number of people currently on the game