const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let rowIndex, columnIndex;
let player = document.getElementById("player");
let board = document.getElementById("board");

let resetButton = document.getElementById('resetButton');
resetButton.style.display = 'none';

function createBoard() {
    board.innerHTML = ''; // Clear the board before creating it
    for (let i = 0; i < map.length; i++) {
        let rowElement = document.createElement("div");
        rowElement.id = "row" + i;
        rowElement.className = "row";

        for (let j = 0; j < map[i].length; j++) {
            let cellElement = document.createElement("div");
            cellElement.dataset.cellIndex = j;
            cellElement.dataset.rowIndex = i;
            if (map[i][j] === "W") {
                cellElement.className = "wall";
            } else if (map[i][j] === " ") {
                cellElement.className = "space";
            } else if (map[i][j] === "S") {
                cellElement.id = "start";
                rowIndex = i;
                columnIndex = j;
            } else if (map[i][j] === "F") {
                cellElement.className = "finish";
            }
            rowElement.appendChild(cellElement);
        }
        board.appendChild(rowElement);
    }
    document.getElementById("start").appendChild(player);
}
createBoard();

function movePlayer(newRowIndex, newColumnIndex) {
    if (map[newRowIndex][newColumnIndex] === " " || map[newRowIndex][newColumnIndex] === "F") {
        let newCell = document.querySelector(`[data-row-index='${newRowIndex}'][data-cell-index='${newColumnIndex}']`);
        newCell.appendChild(player);
        rowIndex = newRowIndex;
        columnIndex = newColumnIndex;
        checkWin(newRowIndex, newColumnIndex);
    }
}

function moveUp() {
    movePlayer(rowIndex - 1, columnIndex);
}

function moveDown() {
    movePlayer(rowIndex + 1, columnIndex);
}

function moveLeft() {
    movePlayer(rowIndex, columnIndex - 1);
}

function moveRight() {
    movePlayer(rowIndex, columnIndex + 1);
}

document.addEventListener('keydown', keyHandler);

function keyHandler(event) {
    const keyName = event.key;
    if (keyName === "ArrowUp") {
        moveUp();
    } else if (keyName === "ArrowDown") {
        moveDown();
    } else if (keyName === "ArrowLeft") {
        moveLeft();
    } else if (keyName === "ArrowRight") {
        moveRight();
    }
}

function checkWin(row, col) {
    if (map[row][col] === "F") {
        let winModal = document.getElementById("winModal");
        winModal.style.display = "flex";
        document.removeEventListener('keydown', keyHandler);
        resetButton.style.display = 'block';
    }
}

document.getElementById("resetButton").onclick = function() {
    // Hide the win modal
    let winModal = document.getElementById("winModal");
    winModal.style.display = "none";
    
    // Reset the game state
    createBoard();
    document.addEventListener('keydown', keyHandler);
    resetButton.style.display = 'none';
}

// Ensure the win modal is hidden on page load
let modal = document.getElementById("winModal");
modal.style.display = "none";

let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}