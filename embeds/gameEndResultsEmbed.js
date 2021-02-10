const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = gameEndResults = (gamestate, winner) => {
    let winningTeam = winner == "L" ? "Liberals" : "Fascists";

    return new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`${winningTeam + ' have won!'}`)
    .addField('Liberals', gamestate.playerInfo.liberals.map(l => l.username).join('\n'), true)
    .addField('Fascists', gamestate.playerInfo.fascists.map(f => f.username).join('\n'), true)
    .setDescription(`*${gamestate.hitler.username} was Hitler!*`)
}
    
    // maybe an indicator of the number of people currently on the game