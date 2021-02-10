/** Dependencies */
const Discord = require("discord.js");

/** Embeds */
const startEmbed = require("../embeds/startEmbed");
const lobbyEmbed = require("../embeds/lobbyEmbed");
const renderGameStateEmbed = require("../embeds/gametableEmbed");
const liberalRoleEmbed = require('../embeds/liberalRoleEmbed');
const fascistRoleEmbed = require('../embeds/fascistRoleEmbed');
const hitlerRoleEmbed = require('../embeds/hitlerRoleEmbed');

const colorText = require('../data/colortext');

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
                if (r.emoji.name == '✅' && playerlist.length >= 5 && u.username == author.username) {
                    m.delete();
                    gameStart(client, author, hostChannel, playerlist);
                } else if (r.emoji.name == '👍' && playerlist.length < 10) {
                    let players = r.users.cache.map(r => r);
                    players = players.filter(p => p.username != 'Secret-Hitler-Bot')
                    m.edit(lobbyEmbed(author, players));
                    playerlist = players;
                    if (playerlist.length >= 5) {
                        m.react('✅')
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
    let newGame = new Game(client, author, hostChannel, players);
    let liberals = newGame.getLiberalPlayers();
    let fascists = newGame.getFascistPlayers();

    for (let p of liberals) {
        p.send('-----------------------------------------------------')
        p.send(liberalRoleEmbed(p))
    }

    for (let p of fascists) {
        p.send('-----------------------------------------------------')
        if (p.username != newGame.hitler.username) {
            p.send(fascistRoleEmbed(p, fascists, newGame.hitler));
        } else {
            p.send(hitlerRoleEmbed(p, fascists, newGame.hitlerKnows));
        }
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
                    hostChannel = channel;
                    if (message.channel.id !== hostChannel.id) {
                        message.channel.send(startEmbed(message.author, hostChannel));
                    }
                    createLobbyEmbed(client, message.author, hostChannel);
                });
        }
        else {
            hostChannel = message.guild.channels.cache.find(
                (c) => c.name == hostChannelName
            );
            console.log('starting game in room called ' + hostChannel)
            if (message.channel.id !== hostChannel.id) {
                message.channel.send(startEmbed(message.author, hostChannel));
            }
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
