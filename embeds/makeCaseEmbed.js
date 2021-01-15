const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = makeYourCaseEmbed = (gamestate, chancellorCandidate, step) => {

    let titleStr = step == 1 ? 'A Chancellor Has Been Chosen.' : step == 2 ? `President ${gamestate.president.username} and Chancellor ${chancellorCandidate.username}!` 
    : "Begin making your case now! Voting will begin very soon."
    return new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(titleStr)
    .setDescription(`President ${gamestate.president} has chosen ${chancellorCandidate} as chancellor.\n`)
    .addField('President', gamestate.president, true)
    .addField('Chancellor', chancellorCandidate, true)
}
    
    // maybe an indicator of the number of people currently on the game