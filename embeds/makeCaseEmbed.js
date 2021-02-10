const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = makeYourCaseEmbed = (gamestate, chancellorCandidate, step) => {

    let titleStr = step == 1 ? `The President has decided to run with...` : step == 2 ? `Chancellor Candidate ${chancellorCandidate.username}!` 
    : "Voting has begun"
    return new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(titleStr)
    .setDescription(`*The ballot is as follows...*`)
    .addField('Presidential Candidate', gamestate.president, true)
    .addField('Chancellor Candidate', chancellorCandidate, true)
}
    
    // maybe an indicator of the number of people currently on the game