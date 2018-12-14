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
let rowIndex, columnIndex
let player = document.getElementById("player");
let board = document.getElementById("board")

let replayButton = document.getElementById('replayButton')
replayButton.style.display = 'none'

function createBoard() {
   
    for (let i = 0; i < map.length; i++) {
        let rowElement = document.createElement("div")
        rowElement.id = "row" + i
        rowElement.className = "row"

        for (let j = 0; j < map[i].length; j++) {
            let cellElement = document.createElement("div")
            cellElement.id = "cell"
            cellElement.dataset.cellIndex = j
            cellElement.dataset.rowIndex = i
            if (map[i][j] === "W") {
                cellElement.className = "wall"
            } else if (map[i][j] === " ") {
                cellElement.className = "space"
            } else if (map[i][j] === "S") {
                // player.style.top = (30 * i) + "px"
                // player.style.left = (30 * j) + "px"
                cellElement.id = "start"
                rowIndex = i
                columnIndex = j
            } else if (map[i][j] === "F") {
                cellElement.className = "finish"
            }
            // console.log(cellElement)
            rowElement.appendChild(cellElement)
        }
        board.appendChild(rowElement)
    }
}
createBoard();


function moveUp() {
    checkWin(rowIndex - 1,columnIndex);
    if (map[rowIndex - 1][columnIndex] == " ") {
        let rowUp = rowIndex - 1
        let cellUp = document.querySelector("[data-row-index='" + rowUp + "'][data-cell-index='" + columnIndex + "']")
        console.log(rowIndex - 1,columnIndex,map[rowIndex - 1][columnIndex])
        cellUp.appendChild(player);
        rowIndex = rowIndex - 1
    }
}
function moveDown() {
    checkWin(rowIndex + 1,columnIndex)
    if (map[rowIndex + 1][columnIndex] == " ") {
        let rowDown = rowIndex + 1
        let cellDown = document.querySelector("[data-row-index='" + rowDown + "'][data-cell-index='" + columnIndex + "']")
        console.log(cellDown)
        cellDown.appendChild(player);
        rowIndex = rowIndex + 1
    }
}
function moveLeft() {
    checkWin(rowIndex,columnIndex - 1)
    console.log(columnIndex - 1,columnIndex - 1, map[rowIndex][columnIndex - 1])
    if (map[rowIndex][columnIndex - 1] == " " || map[rowIndex][columnIndex - 1] == "S") {
        let columnLeft = columnIndex - 1
        let cellLeft = document.querySelector("[data-cell-index='" + columnLeft + "'][data-row-index='" + rowIndex + "']")
        
        cellLeft.appendChild(player);
        columnIndex = columnIndex - 1
    }
}
function moveRight() {
    console.log(columnIndex + 1,rowIndex,map[rowIndex][columnIndex + 1])
    checkWin(rowIndex,columnIndex + 1)
    if (map[rowIndex][columnIndex + 1] == " " || map[rowIndex][columnIndex + 1] == "F") {
        
        let columnRight = columnIndex + 1
        let cellRight = document.querySelector("[data-cell-index='" + columnRight + "'][data-row-index='" + rowIndex + "']")
        
        cellRight.appendChild(player);
        columnIndex = columnIndex + 1
    }
}

document.addEventListener('keydown', keyHandler )

function keyHandler() {
    const keyName = event.key;
    // console.log('keydown event\n\n' + 'key: ' + keyName);
    if (keyName === "ArrowUp") {
        moveUp()
    }else if (keyName === "ArrowDown"){
        moveDown()
    }else if (keyName === "ArrowLeft"){
        moveLeft()
    }else if (keyName === "ArrowRight"){
        moveRight()
    }
}


document.getElementById("start").appendChild(player)

function checkWin(row,col){
    
    if (map[row][col] === "F"){ 
        //let cellUp = document.querySelector("[data-row-index='" + row + "'][data-cell-index='" + col + "']")
        // cellUp.appendChild(player);
        // alert("You won!!!")
        //window.location.reload(true)
        let winMsg = document.createElement("div")
        let winText = document.createTextNode("YOU WIN")
        winMsg.appendChild(winText)       
        document.body.appendChild(winMsg) 
        replayButton.style.display = 'block'
        document.removeEventListener('keydown', keyHandler)
    }
}

 document.getElementById("replayButton").onclick = function() {
     window.location.reload(true)
   }
   
   
//    let endResult = document.getElementById("msg")
//   endResult.className = "bar";

//    endResultText = document.createTextNode(msg);
//    endResult.appendChild(endResultText);
//    container.className = "disableDiv";