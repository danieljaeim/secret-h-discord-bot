const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = chancellorPickingEmbed = (gamestate, supporters, opposers) => new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle(`*Chancellor choosing policy...*`)
.setDescription(`Chancellor ${gamestate.chancellorCandidate} is choosing between **2** policy cards to place on the board.\n
*Remember that President ${gamestate.president} discarded one card before...*\n`)
.addField('Supporters ✅', supporters.length > 0 ? supporters.join('\n') : 'Nobody', true)
.addField('Opponents ❌', opposers.length > 0 ? opposers.join('\n') : 'Nobody', true)
    
    // maybe an indicator of the number of people currently on the game