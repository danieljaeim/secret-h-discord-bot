const Discord = require('discord.js');

module.exports = notifyChancellorCandidate = (gamestate, chancellorCandidate, votedPlayers, edited) => {

    let voted = votedPlayers;
    let notVoted = gamestate.players.filter(p => votedPlayers.find(v => v.id == p.id) == undefined);

    return {
        color: 0x0099ff,
        title: `Voting Time`,
        description: `Vote in this election via ${gamestate.client.user}. \n *Everyone must vote once.*\n\n` + 
        `*...at least **${Math.floor(gamestate.players.length / 2) + 1}** ✅ votes are needed for election.*\n`,
        fields: [
            {
                name: 'Presidential Candidate',
                value: gamestate.president,
                inline: true
            },
            {
                name: 'Chancellor Candidate',
                value: chancellorCandidate,
                inline: true
            },
            {
                name: '\u200B',
                value: '\u200B',
                inline: false
             },
            {
                name: 'Who has voted?',
                value: `*${votedPlayers.length == 0 ? 'Nobody has voted yet' : voted.join('\n')}*`,
                inline: true
            },
            {
                name: 'Who still needs to vote?',
                value: `*${votedPlayers.length == gamestate.players.length ? 'Everybody has voted!' : notVoted.join('\n')}*`,
                inline: true
            }
        ]
    }
}