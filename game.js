module.exports = class Game {
    constructor(client, author, hostChannel, players) {
        /**
         * Meta 
         */

        this.client = client;
        this.author = author;
        this.hostChannel = hostChannel;
        this.players = players;

        this.playerInfo = this.givePlayersRoles(players);
        this.dead = [];
        this.hitler = this.playerInfo.hitler;
        this.cardCount = {
            liberal: 8,
            fascist: 11
        }
        this.factionCount = {
            liberal: [3, 4, 4, 5, 5, 6][players.length],
            fascist: [2, 2, 3, 3, 4, 4][players.length],
        }

        this.board = {
            // there are 5 liberal slots
            liberalOnBoard: 0,
            // there are 6 fascist slots, veto unlocks once there are 5 fascist cards taken
            fascistOnBoard: 0,
            resetCounters: 0,
            fascistRuleset: this.pickFascistRuleset(players)
        }

        /**
         * VOTING: VOTING for president / chancellor
         */
        this.gameStage = "VOTING"
        this.presidentCand = players[Math.random() * players.length];
        
        this.president = undefined;
        this.chancellor = undefined;

        this.getLiberalPlayers = _ => this.playerInfo.liberals;
        this.getFascistPlayers = _ => this.playerInfo.fascists;
    }

    /**
     * 
     * PI: president investigates
     * PE: president examines top 3 cards
     * PP: president picks next president
     * PK: president kills player
     */

    pickFascistRuleset = players => {
        switch(players.length + 2) {
            case(5 || 6):
                return ['', '', 'PE', 'PK', 'PK', 'W']
            case(7 || 8):
                return ['', 'PI', 'PP', 'PK', 'PK', 'W']
            case(9 || 10):
                return ['PI', 'PI', 'PP', 'PK', 'PK', 'W']
            default:
                break;
        }
    }

    givePlayersRoles = players => {
        console.log(players)
        let playersCpy = players.slice(0);
        let playerOrder = playersCpy.slice(0);
        shuffleArray(playerOrder);

        let fascists = [];
        let liberals = [];
        // let fascCount = [2, 2, 3, 3, 4, 4][players.length];
        let fascCount = 1;
        
        while (fascists.length < fascCount) {
            let rand = Math.floor(Math.random() * playersCpy.length);
            fascists.push(playersCpy[rand])
            playersCpy.splice(rand, 1)
        }

        liberals = playersCpy.map(p => p);

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        let hitler = fascists[Math.floor(Math.random() * fascists.length)]

        return {
            liberals,
            fascists,
            playerOrder,
            hitler
        }
    }
}