const Discord = require('discord.js');
const createVoteChancellorEmbed = require('../embeds/voteChancellorEmbed');
const notifyChancellorCandidate = require('../embeds/notifyChancellorCand');
const voteResultsEmbed = require('../embeds/voteResultsEmbed');
const sendPresidentCardsEmbed = require('../embeds/sendPresidentCards');
const sendChancellorCardsEmbed = require('../embeds/sendChancellorCardsEmbed');
const dmVoteChancellorEmbed = require('../embeds/dmVoteChancellorEmbed');
const roleNotificationEmbed = require('../embeds/roleNotificationEmbed');
const gameBoardEmbed = require('../embeds/boardEmbed');
const makeCaseEmbed = require('../embeds/makeCaseEmbed');

const gamestages = require('../data/gamestages');

/** secret-hitler-img */

module.exports = renderGameStateEmbed = (author, hostChannel, gamestate) => {
    const gbEmbed = gameBoardEmbed(gamestate);

    hostChannel.send(roleNotificationEmbed())
        .then(m => {
            setTimeout(function() {
                m.edit(roleNotificationEmbed(true))
            }, 3500);
            setTimeout(function() {
                hostChannel.send(gbEmbed)
                    .then(m => gamestate.embed = m)
                return voteForChancellor(hostChannel, gamestate);
            }, 5000)
        });
    // hostChannel.send({ embed: gameEmbed})
}

var emojibank = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

const voteForChancellor = (hostChannel, gamestate) => {
    let voteEmbed = createVoteChancellorEmbed(gamestate);
    hostChannel.send({ embed: voteEmbed })
        .then(m => {
            let lessThanFivePlayers = gamestate.players.length <= 5;
            let candidates = gamestate.players.filter(p => p.username !== gamestate.president.username &&
                p.username !== gamestate.lastChancellor.username && (p.username !== gamestate.lastPresident.username || lessThanFivePlayers));

            for (let i = 0; i < candidates.length; i++) {
                m.react(emojibank[i]);
            }
            const filter = (res, user) => {
                return user.username == gamestate.president.username;
            }
            const collector = m.createReactionCollector(filter, { dispose: true, max: 1 });
            collector.on('collect', (r, u) => {
                let chancellorNominee = candidates[emojibank.findIndex(e => e == r.emoji.name)];
                m.delete();

                let yesVotes = 0;
                let noVotes = 0;
                let votedPlayers = [];
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
                        }, 2000)
                        setTimeout(function() {
                            notifyEmbed.edit(makeCaseEmbed(gamestate, chancellorNominee, 3))
                        }, 4000)
                        setTimeout(function() {
                            notifyEmbed.edit({ embed: notifyChancellorCandidate(gamestate, chancellorNominee, votedPlayers, votes) })
                        }, 10000);
                    })

                for (let p of gamestate.players) {
                    p.send(dmVoteChancellorEmbed(gamestate, chancellorNominee, p))
                        .then(dm => {
                            dm.react('✅');
                            dm.react('❌');
                            const votefilter = (r, u) => (r.emoji.name == '✅' || r.emoji.name == '❌') && u.username == p.username;
                            const votecollector = dm.createReactionCollector(votefilter, { max: 1} );

                            votecollector.on('collect', (r, u) => {
                                if (r.emoji.name == '✅') {
                                    yesVotes += 1;
                                } else {
                                    noVotes += 1;
                                }
                                dm.delete();
                                votedPlayers.push(u);
                                notifyEmbed.edit({ embed: notifyChancellorCandidate(gamestate, chancellorNominee, votedPlayers, { yesVotes, noVotes }) })
                                    .then(nm => notifyEmbed = nm);

                                // CHECK HERE WHETHER EVERYONE HAS VOTED
                                if (yesVotes + noVotes == gamestate.players.length) {
                                    // create an embed notifying that either it went through or didn't

                                    let voteSuccess = yesVotes >= Math.floor(gamestate.players.length / 2) + 1;
                                    notifyEmbed.delete();

                                    if (voteSuccess) {
                                        gamestate.gamestage = gamestages.PCARDS;
                                        hostChannel.send({ embed: voteResultsEmbed(gamestate, chancellorNominee, true) });
                                        // send the president 3 cards, wait for his reply
                                        sendPresidentCards(gamestate, chancellorNominee);
                                        // send the chancellor the 2 other cards, wait for his reply
                                        // announce the card and ask the next 

                                    } else {
                                        gamestate.board.resetCounters++;
                                        gamestate.gamestage = gamestages.PCHOOSE;
                                        gamestate.embed.edit(gameBoardEmbed(gamestate));
                                        hostChannel.send({ embed: voteResultsEmbed(gamestate, chancellorNominee, false) })
                                            .then(m => {
                                                setTimeout(function() {
                                                    m.delete();
                                                    if (gamestate.board.resetCounters == 3) {
                                                        gamestate.board.resetCounters = 0;
                                                        // do logic to add top card of the game to the board
                                                    }
                                                    gamestate.presidentIndex = (gamestate.presidentIndex + 1) % gamestate.players.length;
                                                    gamestate.president = gamestate.players[gamestate.presidentIndex];
                                                    return voteForChancellor(hostChannel, gamestate);
                                                }, 8000)
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

const sendPresidentCards = (gamestate, chancellorAppointed) => {
    gamestate.lastPresident = gamestate.president;
    gamestate.lastChancellor = chancellorAppointed;
    gamestate.board.resetCounters = 0;

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

    let cards = gamestate.deck.splice(-3);

    cards.forEach(c => {
        if (c == "L") {
            gamestate.discard.liberal++;
        } else {
            gamestate.discard.fascist++;
        }
    });

    gamestate.president.send({ embed: sendPresidentCardsEmbed(gamestate.president, cards) })
        .then(dm => {
            dm.react('1️⃣');
            dm.react('2️⃣');
            dm.react('3️⃣');
            const votefilter = (r, u) => ['1️⃣', '2️⃣', '3️⃣'].includes(r.emoji.name) && u.username == gamestate.president.username;
            const votecollector = dm.createReactionCollector(votefilter, { max: 1 });

            console.log(cards);
            console.log(gamestate.deck);

            votecollector.on('collect', (r, u) => {
                let chosenIndex = ['1️⃣', '2️⃣', '3️⃣'].findIndex(num => num == r.emoji.name);
                let deletedCard = cards.splice(chosenIndex, 1);
                console.log(`${gamestate.president.username} has chosen to discard ${deletedCard}`);
                dm.delete();

                console.log(cards)

                return sendChancellorCards(gamestate, chancellorAppointed, cards);
            })
        })
}

const sendChancellorCards = (gamestate, chancellorAppointed, cards) => {
    chancellorAppointed.send({ embed: sendChancellorCardsEmbed(chancellorAppointed, cards) })
        .then(dm => {
            dm.react('1️⃣');
            dm.react('2️⃣');
            const votefilter = (r, u) => ['1️⃣', '2️⃣'].includes(r.emoji.name) && u.username == chancellorAppointed.username;
            const votecollector = dm.createReactionCollector(votefilter, { max: 1 });

            votecollector.on('collect', (r, u) => {
                let chosenIndex = ['1️⃣', '2️⃣'].findIndex(num => num == r.emoji.name);
                let chosenCard = cards[chosenIndex];
                let otherCard = cards[chosenIndex == 0 ? 1 : 0];

                console.log(chosenCard, otherCard)

                console.log(`${chancellorAppointed.username} has chosen to place ${chosenCard} on the board!`);
                dm.delete();

                if (otherCard == "L") {
                    gamestate.discard.liberal++;
                } else {
                    gamestate.discard.fascist++;
                }

                if (chosenCard == "L") {
                    gamestate.board.liberalOnBoard++;
                    if (gamestate.board.liberalOnBoard == 5) {
                        // liberals win!
                        console.log('LIBERALS HAVE WON THE GAME!');
                        return;
                    }


                } else {
                    gamestate.board.fascistOnBoard++;
                    if (gamestate.board.fascistOnBoard == 6) {
                        // fascists win!
                        console.log('FASCISTS HAVE WON THE GAME!');
                        return;
                    }

                    let fascistEvent = gamestate.board.fascistRuleset[gamestate.board.fascistOnBoard];
                    switch (fascistEvent) {
                        case (''):
                            break;
                        case ('PI'):
                            // current president investigates a player's identity
                            break;
                        case ('PE'):
                            // current president gets to examine the top three cards
                            break;
                        case ('PE'):
                            // current president gets to pick the next president
                            break;
                        case ('PK'):
                            // current president gets to shoot a player
                            break;
                        default:
                            break;
                    }
                    // if this triggers a fascist ruleset, set up the event
                }

                // edit gamestate cards data...

                /* send the unchosen card to the discard pile
                    place the chosen card on the board
                */

                gamestate.presidentIndex = (gamestate.presidentIndex + 1) % gamestate.players.length;
                gamestate.president = gamestate.players[gamestate.presidentIndex];

                return voteForChancellor(gamestate.hostChannel, gamestate);
            })
        })
}


    // maybe an indicator of the number of people currently on the game