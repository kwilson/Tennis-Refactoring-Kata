/**
 * Tennis Game
 * @constructor
 * @param {string} player1Name Display name of player 1
 * @param {string} player2Name Display name of player 1
 */
var TennisGame1 = function TennisGame1(player1Name, player2Name) {
    this.player1Score = 0;
    this.player2Score = 0;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
};

/**
 * @param {string} playerName Name of the player who won the point
 * @returns {void}
 */
TennisGame1.prototype.wonPoint = function wonPoint(playerName) {
    if (playerName === this.player1Name) {
        this.player1Score += 1;
    } else {
        this.player2Score += 1;
    }
};

var scoreStrings = ['Love', 'Fifteen', 'Thirty', 'Forty'];

/**
 * Gets a score string from the numeric [0..4]
 * @param {number} value
 */
function getScoreString(value) {
    if (value > scoreStrings.length - 1) {
        // Probably overkill to check this here since it's being covered by tests
        // and it's a private function but worth discussing whether to return a default
        // or throw an error.
        return '';
    }

    return scoreStrings[value];
}

/**
 * Gets the 'advantage' string value.
 * @param {string} playerName The player with the advantage
 */
function getAdvantageString(playerName) {
    return "Advantage " + playerName;
}

/**
 * Gets the 'win' string value.
 * @param {string} playerName The player that has won
 */
function getWinString(playerName) {
    return "Win for " + playerName;
}

/**
 * Gets the 'draw' string value.
 * @param {number} score 
 */
function getDrawString(score) {
    if (score >= 3) {
        return "Deuce";
    }

    return getScoreString(score) + "-All";
}

/**
 * @returns {string} The current score as a string.
 */
TennisGame1.prototype.getScore = function getScore() {
    // Handle currently drawing
    if (this.player1Score === this.player2Score) {
        return getDrawString(this.player1Score);
    }
    
    // Handle being into advantage scoring
    if (this.player1Score >= 4 || this.player2Score >= 4) {
        var minusResult = this.player1Score - this.player2Score;

        // Player1 in front by 1
        if (minusResult === 1) {
            return getAdvantageString(this.player1Name);
        }
        
        // Player2 in front by 1
        if (minusResult === -1) {
            return getAdvantageString(this.player2Name);
        }
        
        // Player1 in front by 2+
        if (minusResult >= 2) {
            return getWinString(this.player1Name);
        }

        // Player2 in front by 2+
        return getWinString(this.player2Name);
    }

    // Handle ongoing game
    return getScoreString(this.player1Score) + "-" + getScoreString(this.player2Score);
};

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}