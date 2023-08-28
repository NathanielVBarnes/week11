// Get elements
const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restartBtn');
const resultAlert = document.getElementById('resultAlert');
const turnHeading = document.getElementById('turn');

let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
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
    if (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    ) {
      gameActive = false;
      console.log(currentPlayer);
      return currentPlayer;
    } else if (gameBoard.includes("")) {
      console.log("game active");
      gameActive = true;
    } else if (!gameBoard.includes("")) {
      console.log("draw");
      return "draw";
    }
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
  console.log(`winner: ${winner}`);
  if (winner === 'X' || winner === 'O' || winner === 'draw' ) {
   console.log('step 1 ran')
    if (winner === 'draw') {
      console.log('step 2 ran')
      resultAlert.textContent = 'It\'s a draw!';
    } else if (winner === 'X' || winner === 'O') {
      console.log('step 3 ran')
      resultAlert.textContent = `${winner} wins!`;
       resultAlert.classList.add("alert");
        resultAlert.classList.add("alert-success");
    }
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
