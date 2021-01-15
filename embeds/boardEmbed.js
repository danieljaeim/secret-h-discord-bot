const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = gameBoardEmbed = (gamestate) => {
    let liberalsOnBoard = gamestate.board.liberalOnBoard;
    let fascistsOnBoard = gamestate.board.fascistOnBoard;
    let resetCounters = gamestate.board.resetCounters;
    let playerOrder = gamestate.playerOrder;

    gamestate.rotatePresidentToFront();
    
    return new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(`As It Stands`)
    .addField(`Board`,
    `\nFascist: ${new Array(6).fill(0).map((x, i) => i < fascistsOnBoard ? '🟥' : `**[${gamestate.board.fascistRuleset[i]}]**`).join(' ')} \n`+
    `Liberal: ${new Array(5).fill(0).map((x, i) => i < liberalsOnBoard ? '🟦' : '**[  ]**').join(' ')} \n` +
    `Failed Votes: ${new Array(3).fill(0).map((x, i) => i < resetCounters ? '▫' : '▪️').join(' ')}\n\n` +
    `Cards Left: **${gamestate.deck.length}\n**` + 
    `Cards Drawn: **${gamestate.discard.liberal + gamestate.discard.fascist}\n**` +
    '\n\n'
    , true)
    .addField('Player Order', '```diff\n' + playerOrder.map((p, i) => {
        let name = p.username.split(' ').join('-');
        if (name.length > 13) {
        }
        if (p.id == gamestate.president.id) {
            return `-pres. ${name}`
        } 
        if (gamestate.chancellorCandidate) {
            if (p.id == gamestate.chancellorCandidate.id) {
                return `+chan. ${name}`
            }
        }
        if (p.id == gamestate.lastPresident.id || p.id == gamestate.lastChancellor.id) {
            return `---      ${name}`
        }
        return `       ${name}`;
    }).join('\n') + '\n```', true)
    .addField('Current Stage', '```CSS\n' + gamestate.gameStage + '```', false)
}
    
    // maybe an indicator of the number of people currently on the game