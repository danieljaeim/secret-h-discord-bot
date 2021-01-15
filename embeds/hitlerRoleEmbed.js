const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = hitlerRoleEmbed = (player, fascists, hitlerKnows) => {

    let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`My Fuhreh, ${player.username}.`)
        .addField('The traitors are everywhere. . .', 'Rally your hidden comrades. \n Your victory is nigh!', true)
        .attachFiles(['./img/hitler_role.jpg'])
        .setImage('attachment://hitler_role.jpg')

    if (hitlerKnows && fascists.length > 1) {
        let otherFascists = fascists.filter((f => f.username != player.username)).join(', ');
        embed.addField("Fellow Fascists: ", otherFascists, false);
    } else if (fascists.length - 1 > 0) {
        embed.addField(`Number of disguised fascists: `, fascists.length - 1);
    }

    return embed;
}