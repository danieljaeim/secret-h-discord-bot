const Discord = require('discord.js');

module.exports = notifyChancellorCandidate = (gamestate, chancellorCandidate, votedPlayers, edited) => {
    return {
        color: 0x0099ff,
        title: `Voting Time`,
        description: `Players have been sent a voting ballot via direct message from SHBot. \n *Everyone can vote only once, so be careful ;)*\n\n` + 
        `*...at least ${Math.floor(gamestate.players.length / 2) + 1} votes with ✅ are needed for this pair to be elected*\n`,
        fields: [
            {
                name: 'President',
                value: gamestate.president,
                inline: true
            },
            {
                name: 'Chancellor',
                value: chancellorCandidate,
                inline: true
            },
            {
                name: 'Who has voted?',
                value: `*${votedPlayers.length == 0 ? 'Nobody has voted yet' : votedPlayers.map(p => p.username).join('\n')}*`,
                inline: false
            }
        ]
    }
}