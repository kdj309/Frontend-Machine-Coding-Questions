const noofbox = 3;
let currentPlayer = "X";
let gameMap = {
  rows: {},
  cols: {},
  diag: 0,
  antidiag: 0,
};
const boardContainer = document.querySelector(".game_container");
const resetBtn = document.querySelector(".game_actions--reset");
const winnerContainer = document.querySelector(".result_container--winner");
let movecount = 0;
function createGameBoard() {
  for (let i = 0; i < noofbox; i++) {
    const rowRef = document.createElement("div");
    rowRef.className = "row";
    rowRef.addEventListener("click", (e) => {
      if (e.target.className.includes("col")) {
        e.target.innerText = currentPlayer;
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        updateProgress(parseInt(row), parseInt(col));
        const isgameend = gameProgress(parseInt(row), parseInt(col));
        if (movecount === noofbox * noofbox - 1) {
          winnerContainer.innerText = `Game Ended Without Winner Please Reset`;
        }
        if (isgameend) {
          winnerContainer.innerText = `Winner ${currentPlayer}`;
          clearGame();
        } else {
          movecount++;
        }
        swapPlayer();
        console.log(gameMap);
        e.target.classList.add("disableclick");
      }
    });
    for (let j = 0; j < noofbox; j++) {
      const colRef = document.createElement("div");
      colRef.className = "col cell";
      colRef.setAttribute("data-row", i);
      colRef.setAttribute("data-col", j);
      rowRef.appendChild(colRef);
    }
    boardContainer.appendChild(rowRef);
  }
}
function updateProgress(row, col) {
  const value = currentPlayer === "X" ? 1 : -1;
  gameMap.rows[row] = (gameMap.rows[row] || 0) + value;
  gameMap.cols[col] = (gameMap.cols[col] || 0) + value;
  if (row === col) {
    gameMap.diag += value;
  }
  if (row + col === noofbox - 1) {
    gameMap.antidiag += value;
  }
}
function swapPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function gameProgress(row, col) {
  return (
    Math.abs(gameMap.rows[row]) === noofbox ||
    Math.abs(gameMap.cols[col]) === noofbox ||
    Math.abs(gameMap.diag) === noofbox ||
    Math.abs(gameMap.antidiag) === noofbox
  );
}


function clearGame() {
  gameMap = {
    rows: {},
    cols: {},
    diag: 0,
    antidiag: 0,
  };
  const cells = document.querySelectorAll(".cell");
  const cellarray = Array.from(cells);
  for (let index = 0; index < cellarray.length; index++) {
    const cell = cellarray[index];
    cell.classList.add("disableclick");
  }
}
function reset() {
  gameMap = {
    rows: {},
    cols: {},
    diag: 0,
    antidiag: 0,
  };
  customElements = "X";
  movecount = 0;
  const cells = document.querySelectorAll(".cell");
  const cellarray = Array.from(cells);
  for (let index = 0; index < cellarray.length; index++) {
    const cell = cellarray[index];
    cell.classList.remove("disableclick");
    cell.innerText = "";
  }
  winnerContainer.innerText = "";
}
resetBtn.addEventListener("click", reset);
createGameBoard();
