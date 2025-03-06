const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const xScoreSpan = document.getElementById('x-score');
const oScoreSpan = document.getElementById('o-score');

let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xScore = 0;
let oScore = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        const img = document.createElement('img');
        img.src = (currentPlayer === 'x') ? '1.webp' : '2.webp';
        cell.appendChild(img);
        cell.classList.add(currentPlayer); // Add class for styling if needed
        checkWin();
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
}

function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinningCombination(combination);
            updateScore();
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        //It's a draw
        return;
    }
}

function highlightWinningCombination(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function updateScore() {
    if (currentPlayer === 'x') {
        xScore++;
        xScoreSpan.textContent = xScore;
    } else {
        oScore++;
        oScoreSpan.textContent = oScore;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'x';

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning-cell');
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild); // Remove image
        }
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
