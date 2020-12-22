/** Dependencies */
const Discord = require("discord.js");

/** Embeds */
const startEmbed = require("../embeds/startEmbed");
const lobbyEmbed = require("../embeds/lobbyEmbed");
const renderGameStateEmbed = require("../embeds/gametableEmbed");
const Game = require('../game');

const createLobbyEmbed = (client, author, hostChannel) => {
    let playerlist = [];
    const lobbyMessage = lobbyEmbed(author, playerlist);
    const filter = (response, user) => {
        return ['👍', '✅'].includes(response.emoji.name) && user.username != 'Secret-Hitler-Bot';
    };
    hostChannel.send(lobbyMessage)
        .then(m => {
            m.react('👍');
            const collector = m.createReactionCollector(filter, { dispose: true });
            collector.on('collect', (r, u) => {
                if (r.emoji.name == '✅' && playerlist.length > 1 && u.username == author.username) {
                    console.log(client.channels.cache)
                    console.log(hostChannel)
                    gameStart(client, author, hostChannel, playerlist)
                } else if (r.emoji.name == '👍') {
                    let players = r.users.cache.map(r => r);
                    players = players.filter(p => p.username != 'Secret-Hitler-Bot')
                    m.edit(lobbyEmbed(author, players));
                    playerlist = players;
                    if (playerlist.length >= 2) {
                        m.react('✅')
                        // m.reply(`The game can begin, once ${author} clicks the ✅`)
                    }
                }
            });
            collector.on('remove', r => {
                if (r.emoji.name == '👍') {
                    let players = r.users.cache.map(r => r);
                    players = players.filter(p => p.username != 'Secret-Hitler-Bot')
                    playerlist = players;
                    m.edit(lobbyEmbed(author, players));
                    if (playerlist.length < 2 && m.reactions.cache.get('✅') !== undefined) {
                        m.reactions.cache.get('✅').remove()
                    }
                }
            })
        })
};

const gameStart = (client, author, hostChannel, players) => {
    console.log(`Author: ${author}, HostChannel: ${hostChannel}, PlayerList: ${players}`)
    let newGame = new Game(client, author, hostChannel, players);
    let liberals = newGame.getLiberalPlayers();
    let fascists = newGame.getFascistPlayers();

    // console.log("LIBERALS, ", liberals)
    // console.log("FASCISTS, ", fascists)

    for (let p of liberals) {
        p.send(`${p}. You are a liberal. May you catch Hitler and those filthy fascists!`);
    }

    for (let p of fascists) {
        if (newGame.hitler.username == p.username) {
            p.send(`\n\n\n My fuhreh ${newGame.hitler}, you are Hitler. Oust the liberals! We have sent ${fascists.length - 1} fascists to protect you. \n
            Their names are ${fascists.filter((f => f.username != newGame.hitler.username)).join(', ')}. May you reign supreme! \n\n\n `);
            continue;
        }
        p.send(`\n\n\n Your role is fascists. Hitler is ${newGame.hitler.username}. Protect him at all cost. \n\n\n `);
    }

    renderGameStateEmbed(author, hostChannel, newGame);

    /**
     * DM TO EACH PLAYER THEIR ROLE
     * DONE
     * CREATE the starting embed in the game-lobby!
     */

}

module.exports = {
    name: "start",
    description: "initializes the secret hitler instance",
    execute(client, message, args) {
        let hostName = message.author.username;
        hostName = hostName.split(" ").join("-");
        let hostChannelName = `${hostName}-sh`;
        let hostChannel; // this is the channel where the game is hosted

        /** Create the text-channel that will host the game. If the text channel already exists, do not create it. */
        if (!message.guild.channels.cache.some((c) => c.name == hostChannelName)) {
            message.guild.channels.create(hostChannelName, { type: "text" })
                .then((channel) => {
                    console.log("created a new room called " + channel);
                    hostChannel = channel;
                    message.channel.send(startEmbed(message.author, ));
                    createLobbyEmbed(client, message.author, hostChannel);
                });
        }
        else {
            hostChannel = message.guild.channels.cache.find(
                (c) => c.name == hostChannelName
            );
            console.log('starting game in room called ' + hostChannel)
            message.channel.send(startEmbed(message.author, hostChannel));
            createLobbyEmbed(client, message.author, hostChannel);
        }
    }
    // Here we will initialize a new game of secret hitler.
    /**
     * 1. Send an embed in the channel that we just made.
     * 2. People can enter the text channel and type @sh.join to enter the game's queue
     * 3. Once enough people are ready, the host types @sh.ready
     * 4. Bot PM'S them their roles, and they begin the game.
     */
};
