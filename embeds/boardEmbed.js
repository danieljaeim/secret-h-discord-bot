const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = gameBoardEmbed = (gamestate) => {
    let liberalsOnBoard = gamestate.board.liberalsOnBoard;
    let fascistsOnBoard = gamestate.board.fascistsOnBoard;
    let resetCounters = gamestate.board.resetCounters;
    let playerOrder = gamestate.playerOrder;

    gamestate.rotatePresidentToFront();
    
    return new Discord.MessageEmbed()
	.setColor('#0099ff')
    .setTitle(`As It Stands`)
    .addField(`Board`,
    `\nFascists : ${new Array(6).fill(0).map((x, i) => i < fascistsOnBoard ? '🟥' : '⛶').join(' ')} \n`+
    `Liberals : ${new Array(5).fill(0).map((x, i) => i < liberalsOnBoard ? '🟦' : '⛶').join(' ')} \n` +
    `Failed Votes: ${new Array(3).fill(0).map((x, i) => i < resetCounters ? '▫' : '▪️').join(' ')}`, true)
    .addField('Player Order', '```diff\n' + playerOrder.map((p, i) => {
        if (p.id == gamestate.lastPresident.id || p.id == gamestate.lastChancellor.id) {
            return `---   ${p.username}`
        }
        if (p.id == gamestate.president.id) {
            return `-   ${p.username}`
        } 
        if (gamestate.chancellorCandidate) {
            if (p.id == gamestate.chancellorCandidate.id) {
                return `+   ${p.username}`
            }
        }
        return `    ${p.username}`;
    }).join('\n') + '\n```', true)
    .addField('Current Stage', '```CSS\n' + gamestate.gameStage + '```', false)
}
    
    // maybe an indicator of the number of people currently on the game