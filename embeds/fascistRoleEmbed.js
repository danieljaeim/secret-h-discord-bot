const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = fascistRoleEmbed = (player, fascists, hitler) => {
    let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Hello ${player.username}! You are a fascist.`)
        .setDescription(`Escort hitler to the throne and defeat those filthy liberals.`)
        .attachFiles(['./img/fascist_role.jpg'])
        .setImage('attachment://fascist_role.jpg')
        .addField("Hitler: ", hitler.username, false)

    if (fascists.length > 2) {
        let otherFascists = fascists.filter((f => f.username != newGame.hitler.username && f.username != player.username)).join(', ');
        embed.addField("Fellow Fascists: ", otherFascists, false);
    }

    return embed;
}