// Get elements
const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restartBtn');
const resultAlert = document.getElementById('resultAlert');
const turnHeading = document.getElementById('turn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to check for a win
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes('')) {
    return 'draw';
  }

  return null;
}

// Function to handle cell click
function handleCellClick(cell, index) {
  if (!gameActive || gameBoard[index] !== '') {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  
  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    if (winner === 'draw') {
      resultAlert.textContent = 'It\'s a draw!';
    } else {
      resultAlert.textContent = `${winner} wins!`;
    }
    resultAlert.classList.add('alert-success');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnHeading.textContent = `${currentPlayer}'s Turn`;
  }
}

// Function to start a new game
function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  grid.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  resultAlert.textContent = '';
  resultAlert.classList.remove('alert-success');
  turnHeading.textContent = `${currentPlayer}'s Turn`;
}

// Add event listeners
grid.addEventListener('click', event => {
  const cell = event.target;
  const index = Array.from(grid.children).indexOf(cell);
  handleCellClick(cell, index);
});

restartBtn.addEventListener('click', restartGame);

// Initialize the game
restartGame();
