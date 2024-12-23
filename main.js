// Define the maze map
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

let rowIndex, columnIndex; // Player's current position
let player = document.getElementById("player"); // Player element
let board = document.getElementById("board"); // Game board element

let resetButton = document.getElementById('resetButton'); // Reset button element
resetButton.style.display = 'none'; // Hide reset button initially

// Function to create the game board
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
    document.getElementById("start").appendChild(player); // Place the player at the start position
}
createBoard(); // Initialize the game board

// Function to move the player to a new position
function movePlayer(newRowIndex, newColumnIndex) {
    if (map[newRowIndex][newColumnIndex] === " " || map[newRowIndex][newColumnIndex] === "F") {
        let newCell = document.querySelector(`[data-row-index='${newRowIndex}'][data-cell-index='${newColumnIndex}']`);
        newCell.appendChild(player);
        rowIndex = newRowIndex;
        columnIndex = newColumnIndex;
        checkWin(newRowIndex, newColumnIndex); // Check if the player has reached the finish
    }
}

// Functions to move the player in different directions
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

// Event listener for keyboard input
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

// Function to check if the player has reached the finish
function checkWin(row, col) {
    if (map[row][col] === "F") {
        let winModal = document.getElementById("winModal");
        winModal.style.display = "flex";
        document.removeEventListener('keydown', keyHandler); // Disable keyboard input
        resetButton.style.display = 'block'; // Show the reset button
    }
}

// Event listener for the reset button
document.getElementById("resetButton").onclick = function() {
    // Hide the win modal
    let winModal = document.getElementById("winModal");
    winModal.style.display = "none";
    
    // Reset the game state
    createBoard();
    document.addEventListener('keydown', keyHandler); // Re-enable keyboard input
    resetButton.style.display = 'none'; // Hide the reset button
}

// Ensure the win modal is hidden on page load
let modal = document.getElementById("winModal");
modal.style.display = "none";

// Event listener for closing the modal
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

// Event listener for clicking outside the modal to close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}