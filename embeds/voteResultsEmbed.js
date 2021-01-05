const Discord = require('discord.js');

module.exports = voteResultsEmbed = (gamestate, chancellorNominee, voteSuccess) => {
    if (voteSuccess) {
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`*Success*`)
            .setDescription(`*The vote went through!*\n ${gamestate.president} has been elected president, with ${chancellorNominee} as their chancellor!\n 3 policy cards have been sent to ${gamestate.president} via direct message for further deliberation.`)
    } else {
        return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`The vote was a failure!`)
        .setDescription(`*Aww shucks*.\n A majority of players have decided against voting ${gamestate.president} and ${chancellorNominee} in.\n
        The next president shall be chosen soon.\n The failed votes counter increases by one. \n
        *Let's be less picky next time ;)*`)
    }

   
}