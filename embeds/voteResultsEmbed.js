const Discord = require('discord.js');

module.exports = voteResultsEmbed = (gamestate, chancellorNominee, supporters, opposers, voteSuccess, edited) => {
    if (voteSuccess) {
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(edited ? `*President is Picking Policy...*` : `*Success*`)
            .setDescription(`${edited ? `**3 Policies ** have been sent to President ${gamestate.president} via ${gamestate.client.user}.\n
            **They may discard one policy** \n *The other 2 Policies will be sent to Chancellor ${chancellorNominee}*` : '*The vote went through!*'}`)
            .addField('Supporters ✅', supporters.length > 0 ? supporters.join('\n') : 'Nobody voted ✅ *yikes*', true)
            .addField('Opponents ❌', opposers.length > 0 ? opposers.join('\n') : 'Nobody voted ❌ *whoa*', true)

    } else {
        return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`The vote was a failure!`)
        .setDescription(`*Aww shucks*.\n The *Failed Votes* counter increases by one to ${gamestate.board.resetCounters} \n`)
    }

   
}