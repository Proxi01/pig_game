/*
 GAME RULES:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

 */

var scores, roundScores, activePlayer, isPlaying, row, score;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isPlaying) {
        var dice = Math.floor((Math.random() * 6) + 1);
        // var dice = 6;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;
        console.log(dice);
        if (row == dice) {
            nextPlayer();
        }

        else if (dice != 1) {
            row = dice;
            roundScores += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScores;
        }
        else {
            nextPlayer();
        }
    }

});
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isPlaying) {
        scores[activePlayer] += roundScores;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= score) {
            isPlaying = false;
            var winner = document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector('.btn-roll').title = 'Start a new game, please.';

        } else nextPlayer();
    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    isPlaying = true;
    scores = [0, 0];
    roundScores = 0;

    activePlayer = 0;

    score = score = document.querySelector('.score').value;
    if (document.querySelector('.score').addEventListener('change', () => {
        score = document.querySelector('.score').value;
    }));
    document.querySelector('.dice').style.display = 'none';
    document.querySelector(`#score-0`).textContent = 0;
    document.querySelector(`#score-1`).textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.querySelector(`#name-0`).textContent = 'Player 1';
    document.querySelector(`#name-1`).textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.add('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');

}


function nextPlayer() {
    row = null;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

}


