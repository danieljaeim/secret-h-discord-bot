const Discord = require('discord.js');
const createVoteChancellorEmbed = require('../embeds/voteChancellorEmbed');
const notifyChancellorCandidate = require('../embeds/notifyChancellorCand');
const voteResultsEmbed = require('../embeds/voteResultsEmbed');
const sendPresidentCardsEmbed = require('./sendPresidentCardsEmbed');
const sendChancellorCardsEmbed = require('../embeds/sendChancellorCardsEmbed');
const dmVoteChancellorEmbed = require('../embeds/dmVoteChancellorEmbed');
const roleNotificationEmbed = require('../embeds/roleNotificationEmbed');
const gameBoardEmbed = require('../embeds/boardEmbed');
const makeCaseEmbed = require('../embeds/makeCaseEmbed');
const chancellorPickingEmbed = require('../embeds/chancellorPickingEmbed');
const whichCardEmbed = require('../embeds/whichCardPlacedEmbed');
const gameEndEmbed = require('../embeds/gameEndResultsEmbed');
const presidentInvestigationEmbed = require('../embeds/presidentInvestigateEmbed');
const presidentInvestigationResult = require('../embeds/presidentInvestigationResult');
const topThreeCardsEmbed = require('../embeds/topThreeCardsEmbed');
const topThreeNotifications = require('../embeds/topThreeNotifications');
const presidentPickingEmbed = require('../embeds/presidentPickingNotification');
const presidentKillNotifyEmbed = require('../embeds/presidentKillNotifyEmbed');
const hitlerWasSlain = require('../embeds/hitlerWasSlainEmbed');


const gamestages = require('../data/gamestages');

/** secret-hitler-img */

module.exports = renderGameStateEmbed = (author, hostChannel, gamestate) => {
    const gbEmbed = gameBoardEmbed(gamestate);

    hostChannel.send(roleNotificationEmbed(gamestate, false))
        .then(m => {
            setTimeout(function() {
                m.edit(roleNotificationEmbed(gamestate, true))
            }, 3500);
            setTimeout(function() {
                hostChannel.send(gbEmbed)
                    .then(m => {
                        gamestate.embed = m
                        // m.pin();
                        voteForChancellor(hostChannel, gamestate);
                    })
            }, 5000)
        });
}

var emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

const voteForChancellor = (hostChannel, gamestate) => {
    let voteEmbed = createVoteChancellorEmbed(gamestate);
    hostChannel.send({ embed: voteEmbed })
        .then(m => {
            let lessThanFivePlayers = gamestate.players.length <= 5;
            let candidates = gamestate.players.filter(p => p.id !== gamestate.president.id &&
                p.id !== gamestate.lastChancellor.id && (p.id !== gamestate.lastPresident.id || lessThanFivePlayers));

            for (let i = 0; i < candidates.length; i++) {
                m.react(emojibank[i]);
            }
            const filter = (res, user) => {
                return user.id == gamestate.president.id;
            }
            const collector = m.createReactionCollector(filter, { dispose: true, max: 1 });
            collector.on('collect', (r, u) => {
                let chancellorNominee = candidates[emojibank.findIndex(e => e == r.emoji.name)];
                m.delete();

                let yesVotes = 0;
                let noVotes = 0;
                let votedPlayers = [];
                let supporters = [];
                let opposers = [];
                let votes = { yesVotes, noVotes }
                let notifyEmbed;

                gamestate.chancellorCandidate = chancellorNominee;
                gamestate.gameStage = gamestages.CHVOTE
                // upstate gamestate with chancellorCandidate then re-render board state
                gamestate.embed.edit(gameBoardEmbed(gamestate))

                // render notify chancellor embed here
                hostChannel.send(makeCaseEmbed(gamestate, chancellorNominee, 1))
                    .then(m => {
                        notifyEmbed = m;
                        setTimeout(function() {
                            notifyEmbed.edit(makeCaseEmbed(gamestate, chancellorNominee, 2))
                                .then(notifyEmbed = m)
                        }, 2000)
                        setTimeout(function() {
                            notifyEmbed.edit(makeCaseEmbed(gamestate, chancellorNominee, 3))
                                .then(notifyEmbed = m)
                        }, 4000)
                        setTimeout(function() {
                            notifyEmbed.edit({ embed: notifyChancellorCandidate(gamestate, chancellorNominee, votedPlayers, votes) })
                                .then(notifyEmbed = m)
                        }, 6000);
                    })

                for (let p of gamestate.players) {
                    p.send(dmVoteChancellorEmbed(gamestate, chancellorNominee, p))
                        .then(dm => {
                            dm.react('✅');
                            dm.react('❌');
                            const votefilter = (r, u) => (r.emoji.name == '✅' || r.emoji.name == '❌') && u.id == p.id;
                            const votecollector = dm.createReactionCollector(votefilter, { max: 1} );

                            votecollector.on('collect', (r, u) => {
                                if (r.emoji.name == '✅') {
                                    yesVotes += 1;
                                    supporters.push(u.username);
                                } else {
                                    noVotes += 1;
                                    opposers.push(u.username)
                                }
                                dm.delete();
                                votedPlayers.push(u);
                                notifyEmbed.edit({ embed: notifyChancellorCandidate(gamestate, chancellorNominee, votedPlayers, { yesVotes, noVotes }) })
                                    .then(nm => notifyEmbed = nm);

                                if (yesVotes + noVotes == gamestate.players.length) {
                                    notifyEmbed.delete();

                                    let voteSuccess = yesVotes >= Math.floor(gamestate.players.length / 2) + 1;
                                    if (voteSuccess) {
                                        gamestate.chancellorCandidate = chancellorNominee;
                                        gamestate.gamestage = gamestages.PCARDS;
                                        gamestate.board.resetCounters = 0;
                                        gamestate.embed.edit(gameBoardEmbed(gamestate));
                                        hostChannel.send({ embed: voteResultsEmbed(gamestate, chancellorNominee, supporters, opposers, true, false) })
                                            .then(m => 
                                                setTimeout(function() {
                                                    m.edit(voteResultsEmbed(gamestate, chancellorNominee, supporters, opposers, true, true));
                                                    sendPresidentCards(gamestate, chancellorNominee, m, supporters, opposers);
                                                }, 5000));
                                    } else {
                                        gamestate.board.resetCounters++;
                                        gamestate.chancellorCandidate = null;
                                        gamestate.gamestage = gamestages.PCHOOSE;
                                        gamestate.presidentIndex = (gamestate.presidentIndex + 1) % gamestate.playerOrder.length;
                                        gamestate.president = gamestate.playerOrder[gamestate.presidentIndex];
                                        gamestate.rotatePresidentToFront();
                                        hostChannel.send({ embed: voteResultsEmbed(gamestate, chancellorNominee, false) })
                                            .then(m => {
                                                setTimeout(function() {
                                                    m.delete();
                                                    if (gamestate.board.resetCounters == 3) {
                                                        gamestate.board.resetCounters = 0;
                                                        let chosenCard = gamestate.deck.shift();

                                                        if (chosenCard == "L") {
                                                            gamestate.board.liberalOnBoard++;
                                                            gamestate.hostChannel.send(whichCardEmbed(true))
                                                                .then(m => {
                                                                    setTimeout(function() {
                                                                        m.delete();
                                                                    }, 3000)
                                                                })
                                        
                                                            if (gamestate.board.liberalOnBoard == 5) {
                                                                hostChannel.send(gameEndEmbed("L"));
                                                                console.log('LIBERALS HAVE WON THE GAME!');
                                                                return;
                                                            }
                                                        } else if (chosenCard == "F") {
                                                            gamestate.board.fascistOnBoard++;
                                                            gamestate.hostChannel.send(whichCardEmbed(false))
                                                                .then(m => {
                                                                    setTimeout(function() {
                                                                        m.delete();
                                                                    }, 3000)
                                                                })
                                                            if (gamestate.board.fascistOnBoard == 6) {
                                                                // fascists win!
                                                                hostChannel.send(gameEndEmbed("R"));
                                                                console.log('FASCISTS HAVE WON THE GAME!');
                                                                return;
                                                            }
                                                        }
                                                    }
                                                    gamestate.embed.edit(gameBoardEmbed(gamestate));
                                                    return voteForChancellor(hostChannel, gamestate);
                                                }, 4000)
                                            });
                                    }
                                }
                            })
                        })
                }
            })
        })
}

// could use a function that advances the game-state depending on outcome of the state

const sendPresidentCards = (gamestate, chancellorAppointed, presEmbed, supporters, opposers) => {
    let cards = gamestate.deck.splice(-3);

    if (gamestate.deck.length <= 2) {
        gamestate.deck.cards.forEach(c => {
            if (c == "L") {
                gamestate.discard.liberal++;
            } else {
                gamestate.discard.fascist++;
            }
        })

        gamestate.deck = gamestate.shuffleDeck(gamestate.discard.liberal, gamestate.discard.fascist);
    }

    cards.forEach(c => {
        if (c == "L") {
            gamestate.discard.liberal++;
        } else {
            gamestate.discard.fascist++;
        }
    });

    gamestate.president.send({ embed: sendPresidentCardsEmbed(gamestate, cards) })
        .then(dm => {
            dm.react('1️⃣');
            dm.react('2️⃣');
            dm.react('3️⃣');
            const votefilter = (r, u) => ['1️⃣', '2️⃣', '3️⃣'].includes(r.emoji.name) && u.id == gamestate.president.id;
            const votecollector = dm.createReactionCollector(votefilter, { max: 1 });

            console.log(cards);
            console.log(gamestate.deck);

            votecollector.on('collect', (r, u) => {
                let chosenIndex = ['1️⃣', '2️⃣', '3️⃣'].findIndex(num => num == r.emoji.name);
                let deletedCard = cards.splice(chosenIndex, 1);
                console.log(`${gamestate.president.username} has chosen to discard ${deletedCard}`);
                dm.delete();
                return sendChancellorCards(gamestate, chancellorAppointed, cards, presEmbed, supporters, opposers);
            })
        })
}

const sendChancellorCards = (gamestate, chancellorAppointed, cards, currentEmbed, supporters, opposers) => {
    currentEmbed.edit(chancellorPickingEmbed(gamestate, supporters, opposers))
    chancellorAppointed.send({ embed: sendChancellorCardsEmbed(chancellorAppointed, cards) })
        .then(dm => {
            dm.react('1️⃣');
            dm.react('2️⃣');
            const votefilter = (r, u) => ['1️⃣', '2️⃣'].includes(r.emoji.name) && u.id == chancellorAppointed.id;
            const votecollector = dm.createReactionCollector(votefilter, { max: 1 });

            votecollector.on('collect', (r, u) => {
                let chosenIndex = ['1️⃣', '2️⃣'].findIndex(num => num == r.emoji.name);
                let chosenCard = cards[chosenIndex];

                console.log(`${chancellorAppointed.username} has chosen to place ${chosenCard} on the board!`);
                dm.delete();

                if (chosenCard == "L") {
                    gamestate.board.liberalOnBoard++;
                    currentEmbed.edit(whichCardEmbed(true))
                        .then(m => {
                            setTimeout(function() {
                                m.delete();
                            }, 3000)
                        })

                    if (gamestate.board.liberalOnBoard == 5) {
                        // liberals win!
                        hostChannel.send(gameEndEmbed("L"));
                        console.log('LIBERALS HAVE WON THE GAME!');
                        return;
                    }
                } else if (chosenCard == "F") {
                    gamestate.board.fascistOnBoard++;
                    currentEmbed.edit(whichCardEmbed(false))
                        .then(m => {
                            setTimeout(function() {
                                m.delete();
                            }, 3000)
                        })

                    if (gamestate.board.fascistOnBoard == 6) {
                        // fascists win!
                        hostChannel.send(gameEndEmbed("F"));
                        console.log('FASCISTS HAVE WON THE GAME!');
                        return;
                    }

                    let fascistEvent = gamestate.board.fascistRuleset[gamestate.board.fascistOnBoard - 1];
                    let nonPresidents = gamestate.players.filter(p => p.id != gamestate.president.id);
                    switch (fascistEvent) {
                        case ('  '):
                            break;
                        case ('PI'):
                            // current president investigates a player's identity
                            gamestate.hostChannel.send(presidentInvestigationEmbed(gamestate, '', nonPresidents, false))
                                .then(m => {
                                    nonPresidents.forEach((p, i) => {
                                        m.react(emojibank[i]);
                                    })

                                    const voteFilter = (r, u) => emojibank.includes(r.emoji.name) && u.id == gamestate.president.id;
                                    const votecollector = m.createReactionCollector(voteFilter, {max: 1});

                                    votecollector.on('collect', (r, u) => {
                                        let chosenIndex = emojibank.findIndex(num => num == r.emoji.name);
                                        let chosenUser = nonPresidents[chosenIndex];
                                        gamestate.president.send(presidentInvestigationResult(chosenUser));

                                        setTimeout(function() {
                                            m.edit(presidentInvestigationEmbed(gamestate, chosenUser, true));
                                            resetRound(gamestate, chancellorAppointed);
                                        }, 5000)
                                    })
                                });
                            return;
                        case ('PE'):
                            // current president gets to examine the top three cards
                            gamestate.hostChannel.send(topThreeNotifications(gamestate))
                                .then(m => {
                                    gamestate.president.send(topThreeCardsEmbed(gamestate));
                                    setTimeout(function() {
                                        m.delete();
                                        resetRound(gamestate, chancellorAppointed);
                                    }, 5000)
                                });
                            return;
                        case ('PP'):
                            gamestate.hostChannel.send(presidentPickingEmbed(gamestate, null, false))
                                .then(m => {
                                    nonPresidents.forEach((p, i) => {
                                        m.react(emojibank[i]);
                                    })

                                    const voteFilter = (r, u) => emojibank.includes(r.emoji.name) && u.id == gamestate.president.id;
                                    const votecollector = m.createReactionCollector(voteFilter, {max: 1});

                                    votecollector.on('collect', (r, u) => {
                                        let chosenIndex = emojibank.findIndex(num => num == r.emoji.name);
                                        let chosenUser = nonPresidents[chosenIndex];
                                        m.edit(presidentPickingEmbed(gamestate, chosenUser, true));

                                        setTimeout(function() {
                                            resetRound(gamestate, chancellorAppointed, chosenUser);
                                        }, 5000)
                                    })
                                })
                            return;
                        case ('PK'):
                            gamestate.hostChannel.send(presidentKillNotifyEmbed(gamestate, null, false))
                                .then(m => {
                                    nonPresidents.forEach((p, i) => {
                                        m.react(emojibank[i]);
                                    })

                                    const voteFilter = (r, u) => emojibank.includes(r.emoji.name) && u.id == gamestate.president.id;
                                    const votecollector = m.createReactionCollector(voteFilter, {max: 1});

                                    votecollector.on('collect', (r, u) => {
                                        let chosenIndex = emojibank.findIndex(num => num == r.emoji.name);
                                        let chosenUser = nonPresidents[chosenIndex];
                                        m.edit(presidentKillNotifyEmbed(gamestate, chosenUser, true));

                                        if (chosenUser.id == gamestate.hitler.id) {
                                            console.log('liberals have killed hitler!');
                                            hostChannel.send(gameEndEmbed("L"));
                                            return;
                                        }

                                        let playerIndex = gamestate.players.find(p => p.id == chosenUser.id);
                                        gamestate.players.splice(playerIndex, 1);

                                        setTimeout(function() {
                                            resetRound(gamestate, chancellorAppointed, chosenUser);
                                        }, 5000)
                                    })
                                })
                            return;
                        default:
                            break;
                    }
                    // if this triggers a fascist ruleset, set up the event
                }

                resetRound(gamestate, chancellorAppointed);
            })
        })
}

const resetRound = (gamestate, chancellorAppointed, pickedPresident) => {
    gamestate.lastPresident = gamestate.president;
    gamestate.lastChancellor = chancellorAppointed;
    gamestate.board.resetCounters = 0;

    if (pickedPresident) {
        gamestate.president = pickedPresident;
    } else {
        gamestate.presidentIndex = (gamestate.presidentIndex + 1) % gamestate.playerOrder.length;
        gamestate.president = gamestate.playerOrder[gamestate.presidentIndex];
    }
    gamestate.rotatePresidentToFront();
    gamestate.chancellorCandidate = undefined;
    setTimeout(async function() {
        await gamestate.embed.edit(gameBoardEmbed(gamestate));
        setTimeout(function() {
            return voteForChancellor(gamestate.hostChannel, gamestate);
        }, 5000)
    }, 3000)
}


    // maybe an indicator of the number of people currently on the game