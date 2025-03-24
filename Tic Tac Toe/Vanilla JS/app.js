const noofbox = 3;
let currentPlayer = "X";
let game = [];
const boardContainer = document.querySelector(".game_container");
const resetBtn=document.querySelector(".game_actions--reset");
const winnerContainer = document.querySelector(".result_container--winner")
let movecount=0;
function createGameBoard() {
    for (let i = 0; i < noofbox; i++) {
        const rowRef = document.createElement("div")
        rowRef.className = "row";
        rowRef.addEventListener("click", (e) => {
            if (e.target.className.includes("col")) {
                e.target.innerText = currentPlayer;
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                updateProgress(row, col, currentPlayer)
                const isgameend = gameProgress();
                if (movecount===noofbox*noofbox-1) {
                    winnerContainer.innerText = `Game Ended Without Winner Please Reset`;
                }
                if (isgameend) {
                    winnerContainer.innerText = `Winner ${currentPlayer}`;
                    clearGame()
                }else{
                    movecount++;
                }
                swapPlayer();
                // e.target.classList.add("disableclick")
            }
        },{once:true})
        for (let j = 0; j < noofbox; j++) {
            const colRef = document.createElement("div")
            colRef.className = "col cell";
            colRef.setAttribute("data-row", i)
            colRef.setAttribute("data-col", j)
            rowRef.appendChild(colRef)
        }
        boardContainer.appendChild(rowRef)
    }
}
function updateProgress(row, col, value) {
    if (!game[row]) {
        game[row] = [];
    }
    game[row][col] = value
}
function swapPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
}

function gameProgress() {
    //!row condition
    for (let index = 0; index < game.length; index++) {
        const row = game[index];
        if (winningCondition(row)) {
            return true;
        }
    }
    //!col condition
    for (let index = 0; index < game.length; index++) {
        const line = game.map((row) => row[index])
        if (winningCondition(line)) {
            return true;
        }
    }
    //!diagonal condition
    const firstdiagonal = game.map((row, idx) => row[idx]);
    const secondiagonal = game.map((row, idx) => row[game.length - 1 - idx])
    if (winningCondition(firstdiagonal) || winningCondition(secondiagonal)) {
        return true;
    }

    return false;
}

function winningCondition(line) {
    if (line.length === noofbox) {
        return line.every((element) => line[0] === element && element != undefined)
    }
    return false;
}
function clearGame() {
    game = [];
    disableClickForAllCells()
}
function reset() {
    game = [];
    customElements="X";
    disableClickForAllCells(true)
    winnerContainer.innerText=""
}
function disableClickForAllCells(clearText=false) {
    const cells = document.querySelectorAll(".cell");
    const cellarray = Array.from(cells);
    for (let index = 0; index < cellarray.length; index++) {
        const cell = cellarray[index];
        cell.classList.remove("disableclick")
        if (clearText) {
            cell.innerText = ""
        }
    }
}
resetBtn.addEventListener("click",reset)
createGameBoard()
