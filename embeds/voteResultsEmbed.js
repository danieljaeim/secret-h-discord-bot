const Discord = require('discord.js');

module.exports = voteResultsEmbed = (gamestate, chancellorNominee, supporters, opposers, voteSuccess, edited) => {
    if (voteSuccess) {
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(edited ? `*President picking policy...*` : `*Success*`)
            .setDescription(`${edited ? `Our President ${gamestate.president} has been sent **3** *policy cards* via *direct message* via ${gamestate.client.user}.\n
            Please discard one policy now.\n
            The **2** other policies will be sent to ${chancellorNominee} for *further deliberation* via ${gamestate.client.user}` : '*The vote went through!*'}`)
            .addField('Supporters ✅', supporters.length > 0 ? supporters.join('\n') : 'Nobody voted ✅ *yikes*', true)
            .addField('Opponents ❌', opposers.length > 0 ? opposers.join('\n') : 'Nobody voted ❌ *whoa*', true)

    } else {
        return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`The vote was a failure!`)
        .setDescription(`*Aww shucks*.\n The majority of players decided voted against ${gamestate.president} and ${chancellorNominee}\n
        The next president will be chosen.\n The *Failed Votes* counter increases by one. \n
        *Let's be less picky next time ;)*`)
    }

   
}