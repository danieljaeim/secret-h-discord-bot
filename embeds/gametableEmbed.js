const Discord = require('discord.js');

/** secret-hitler-img */

module.exports = renderGameStateEmbed = (author, channel, gamestate) => {
    const exampleEmbed = {
        color: 0x0099ff,
        title: `Secret Hitler Game`,
        url: 'https://discord.js.org',
        author: {
            name:  `${author.username}`
        },
        description: 'Some description here',
        thumbnail: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        fields: [
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
        ],
        footer: {
            text: gamestate.stage,
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        },
    };
    hostChannel.send({ embed: exampleEmbed})

}
    
    // maybe an indicator of the number of people currently on the game