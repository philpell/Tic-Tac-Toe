const playCells = document.getElementsByClassName('playCell');
const newGame = document.getElementById('newGame');
const startModal = document.getElementById('startModal');
const startYes = document.getElementById('startYes');
const startNo = document.getElementById('startNo');
let turn = 1;
let numOfTurns = 0;
let board = [];

const winConditions = [
    ['1X', '2X', '3X'], ['1X', '4X', '7X'], ['1X', '5X', '9X'],
    ['2X', '5X', '8X'], ['3X', '6X', '9X'], ['3X', '5X', '7X'],
    ['4X', '5X', '6X'], ['7X', '8X', '9X'],
    ['1O', '2O', '3O'], ['1O', '4O', '7O'], ['1O', '5O', '9O'],
    ['2O', '5O', '8O'], ['3O', '6O', '9O'], ['3O', '5O', '7O'],
    ['4O', '5O', '6O'], ['7O', '8O', '9O']
];

function createPlayer(mark) {
    return {
        mark,
        moves: [],
        checkWin() {
            return winConditions
                .filter(cond => cond[0].endsWith(mark))
                .some(cond => cond.every(cell => this.moves.includes(cell)));
        }
    };
}

const playerX = createPlayer('X');
const playerO = createPlayer('O');

function checkStatus() {
    if (playerX.checkWin()) {
        handleWin('Player 1');
    } else if (playerO.checkWin()) {
        handleWin('Player 2');
    } else if (numOfTurns === 9) {
        handleTie();
    }
}

function handleWin(player) {
    showModal(`${player} wins, would you like to play again?`);
}

function handleTie() {
    showModal('Game tied, would you like to play again?');
}

function showModal(message) {
    const modal = document.getElementById('gameModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalYes = document.getElementById('modalYes');
    const modalNo = document.getElementById('modalNo');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    modalYes.onclick = () => {
        modal.style.display = 'none';
        clearBoard();
    };

    modalNo.onclick = () => {
        modal.style.display = 'none';
        window.close();
    };
}

for (const cell of playCells) {
    cell.addEventListener('click', function onClick() {
        if (cell.innerHTML === '') {
            const currentPlayer = turn === 1 ? playerX : playerO;
            cell.setAttribute("id", cell.id + currentPlayer.mark);
            cell.innerHTML = currentPlayer.mark;
            currentPlayer.moves.push(cell.id);
            turn = turn === 1 ? 2 : 1;
            numOfTurns++;
            setTimeout(checkStatus, 900);
        }
    });
}

newGame.addEventListener('click', () => {
    clearBoard();
});

// Show the start modal when the page loads
window.onload = () => {
    startModal.style.display = 'block';
};

startYes.onclick = () => {
    startModal.style.display = 'none';
};

startNo.onclick = () => {
    window.close();
};

function clearBoard() {
    // Clear the cells
    for (const cell of playCells) {
        cell.innerHTML = '';
        // Extract the original id from the modified id (e.g., "1X" -> "1")
        let originalId = cell.id.replace(/[XO]$/, '');
        cell.setAttribute('id', originalId);
    }

    // Reset the game state variables
    turn = 1;
    numOfTurns = 0;
    playerX.moves = [];
    playerO.moves = [];
}