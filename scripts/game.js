// Constants
const winningMatrix = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

const playerNameElement = document.querySelector("#player-name");
const savedName = localStorage.getItem("CurrentPlayerTicTacName");
if (savedName) playerNameElement.textContent = savedName;


let userPlayer = "X";
let aiPlayer = "O";
let gameState = ["", "", "", "", "", "", "", "", ""];
let difficulty = "medium"; 


const resetButton = document.querySelector("#reset");
const scoreXElement = document.querySelector("#score-x");
const scoreOElement = document.querySelector("#score-o");
const cells = document.querySelectorAll(".cell");
let scoreX = 0;
let scoreO = 0;

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute("data-index");


  if (
    gameState[index] !== "" ||
    checkWin(gameState, userPlayer) ||
    checkWin(gameState, aiPlayer)
  ) {
    return;
  }


  gameState[index] = userPlayer;
  cell.textContent = userPlayer;
  console.log(`Player ${userPlayer} clicked on cell ${index}`);
  console.log("Game State:", gameState);

  if (checkWin(gameState, userPlayer)) {
    // alert(`Player ${userPlayer} wins!`);
    popup("Congratulations 🎉", `You win! `);
    scoreX++;
    scoreXElement.textContent = scoreX;
    drawWinningLine(gameState, userPlayer);
    return;
  }

  if (gameState.every((cell) => cell !== "")) {
    popup("It's a Tie! 🫣", " Nobody Wins!! ");
    // alert("Draw!");
    return;
  }


  aiMove();
};

function checkWin(board, player) {
  return winningMatrix.some((combination) =>
    combination.every((index) => board[index] === player)
  );
}

function drawWinningLine(board, player) {
  const winningCombination = winningMatrix.find((combination) =>
    combination.every((index) => board[index] === player)
  );

  if (winningCombination) {
    const line = document.getElementById("line");
    line.style.transform = "scaleX(0)"; // Reset line scale

    const firstCell = document.querySelector(
      `[data-index="${winningCombination[0]}"]`
    );
    const lastCell = document.querySelector(
      `[data-index="${winningCombination[2]}"]`
    );

    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();
    const gameRect = document.getElementById("game").getBoundingClientRect();

    const startX = firstRect.left - gameRect.left + firstRect.width / 2;
    const startY = firstRect.top - gameRect.top + firstRect.height / 2;
    const endX = lastRect.left - gameRect.left + lastRect.width / 2;
    const endY = lastRect.top - gameRect.top + lastRect.height / 2;

    const length = Math.hypot(endX - startX, endY - startY);
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);


    line.style.width = `${length}px`;
    line.style.transformOrigin = "0 0";
    line.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg) scaleX(1)`;
  }
}

function aiMove() {
  if (
    checkWin(gameState, userPlayer) ||
    gameState.every((cell) => cell !== "")
  ) {
    return;
  }

  if (difficulty === "medium") {
    mediumMove();
  } else {
    hardMove();
  }

  
  if (checkWin(gameState, aiPlayer)) {
    // alert(`Player ${} wins!`);

    popup("Oh No! ☠️", `The PC wins! Better luck next time!`);

    scoreO++;
    scoreOElement.textContent = scoreO;
    drawWinningLine(gameState, aiPlayer);
    return;
  }

  if (gameState.every((cell) => cell !== "")) {
    popup("It's a Tie! 🫣", " Nobody Wins!! ");
  }
}

function mediumMove() {

  const emptyIndexes = gameState
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);
  const randomIndex =
    emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  gameState[randomIndex] = aiPlayer;
  document.querySelector(`[data-index="${randomIndex}"]`).textContent =
    aiPlayer;
  console.log(`AI (Medium) random move to cell ${randomIndex}`);
}

function minimax(board, depth, isMaximizing, aiPlayer, opponent) {
  const scores = {
    [aiPlayer]: 1,
    [opponent]: -1,
    tie: 0,
  };

  const winner = checkWin(board, aiPlayer)
    ? aiPlayer
    : checkWin(board, opponent)
    ? opponent
    : null;
  if (winner) {
    return scores[winner];
  }

  if (board.every((cell) => cell !== "")) {
    return scores.tie;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = aiPlayer;
        let score = minimax(board, depth + 1, false, aiPlayer, opponent);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = opponent;
        let score = minimax(board, depth + 1, true, aiPlayer, opponent);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function hardMove() {
  const opponent = userPlayer;
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      gameState[i] = aiPlayer;
      let score = minimax(gameState, 0, false, aiPlayer, opponent);
      gameState[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  gameState[move] = aiPlayer;
  document.querySelector(`[data-index="${move}"]`).textContent = aiPlayer;
  console.log(`PC (Hard) moves to cell ${move}`);
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  userPlayer = "X"; // Reset to "X" starting the game
  cells.forEach((cell) => (cell.textContent = ""));
  const line = document.getElementById("line");
  line.style.width = "0";
  line.style.transform = "scaleX(0)";
  console.log("Game reset");
}

const handleDifficultyChange = (e) => {
  resetGame();
  difficulty = e.target.value;
  console.log("Difficulty set to:", difficulty);
};

// Event listeners
resetButton.addEventListener("click", resetGame);
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelectorAll("input[name='difficulty']")
  .forEach((input) => input.addEventListener("change", handleDifficultyChange));

const popup = (title, msg) => {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".popup").style.top = "200px";

  document.querySelector(".title").textContent = title;
  document.querySelector(".msg").textContent = msg;
};

document.getElementById("close").addEventListener("click", () => {
  resetGame();
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".popup").style.top = "-100%";
});
