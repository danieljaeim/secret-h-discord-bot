const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = roleNotificationEmbed = (gamestate, edited) => {

    let PI = gamestate.board.fascistRuleset.indexOf('PI') > -1;
    let PE = gamestate.board.fascistRuleset.indexOf('PE') > -1;
    let PP = gamestate.board.fascistRuleset.indexOf('PP') > -1;
    let PK = gamestate.board.fascistRuleset.indexOf('PK') > -1;

    let footerStr = '';
    if (PI) footerStr += `PI: President investigates a player\'s faction\n`;
    if (PE) footerStr += `PE: President examines next 3 policies in deck\n`;
    if (PP) footerStr += `PP: President directly decides next president\n`;
    if (PK) footerStr += `PK: President chooses and kills another player.\n`;

    return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${edited ? 'The Game has Begun!' : `**Factions** have been delivered to each player.`}`) // might be nice to tag the bot here
        .setDescription(`Your faction, *fascist* or *liberal*, was sent through ${gamestate.client.user}`)
        .addField('Liberal Victory Conditions', '• Place **5 Liberal Policies**. \n • *Kill* Hitler.', true)
        .addField('Fascist/Hitler Victory Conditions', '• Place **6 Fascist Policies**. \n • *Elect* **Hitler** as *Chancellor*, after **3 Fascist Policies**', true)
        .setFooter(footerStr)
}
    
    // maybe an indicator of the number of people currently on the game