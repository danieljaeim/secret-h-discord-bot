const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = gameBoardEmbed = (gamestate) => {
    let liberalsOnBoard = gamestate.board.liberalOnBoard;
    let fascistsOnBoard = gamestate.board.fascistOnBoard;
    let resetCounters = gamestate.board.resetCounters;
    let playerOrder = gamestate.playerOrder;
    
    return new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(`As It Stands`)
    .addField(`Board`,
        `\n\nFascist - ${new Array(6).fill(0).map((x, i) => i < fascistsOnBoard ? '🟥' : `**[${gamestate.board.fascistRuleset[i]}]**`).join(' ')} ${new Array(20).join(' ')} \n`+
        `Liberal - ${new Array(5).fill(0).map((x, i) => i < liberalsOnBoard ? '🟦' : '**[ + ]**').join(' ')} \n` +
        `Failed Votes - ${new Array(3).fill(0).map((x, i) => i < resetCounters ? '▫' : '▪️').join(' ')} -\n\n`
        , true)
    .addField('Policies', `in Deck - **${gamestate.deck.length}**   //  ` +
        `in Discard: **${gamestate.discard.liberal + gamestate.discard.fascist}\n**`, false)
    .addField('Player Order', '```diff\n' + playerOrder.map((p, i) => {
        let name = p.username.split(' ').join('-');
        if (name.length > 13) {
        }
        if (p.id == gamestate.president.id) {
            return `-president.  ${name}`
        } 
        if (gamestate.chancellorCandidate) {
            if (p.id == gamestate.chancellorCandidate.id) {
                return `+chancellor. ${name}`
            }
        }
        if (gamestate.players.length > 5 && (p.id == gamestate.lastPresident.id || p.id == gamestate.lastChancellor.id)) {
            return `---          ${name}`
        }
        return `             ${name}`;
    }).join('\n') + '\n```', false)
    .setFooter(`There are ${gamestate.factionCount.fascist} Fascists and ${gamestate.factionCount.liberal} Liberals\n\n` +
    `${gamestate.gameStage}`)
    // .addField('Current Stage', '```CSS\n' + gamestate.gameStage + '```', false)
    // .setFooter(`There are ${gamestate.factionCount.fascist} Fascists and ${gamestate.factionCount.liberal} Liberals`)
}
    
    // maybe an indicator of the number of people currently on the game