//### ELEMENTS
const resetBtn = document.getElementById("resetBtn");
const table = document.getElementById("gameTable");
const endGamePanel = document.getElementById("endGamePanel");

const cells = 
    Object.freeze(Array.from(table.getElementsByClassName("cell")));

//### CONSTANTS
const x = 'X';
const o = 'O';
const winConditions = Object.freeze([
    // Horizontal wins
    Object.freeze([0, 1, 2]),
    Object.freeze([3, 4, 5]),
    Object.freeze([6, 7, 8]),
    // Vertical wins
    Object.freeze([0, 3, 6]),
    Object.freeze([1, 4, 7]),
    Object.freeze([2, 5, 8]),
    // Diagonal wins
    Object.freeze([0, 4, 8]),
    Object.freeze([6, 4, 2])
]);
const turns = Object.freeze(["playerTurn", "pcTurn"]);

//### STATE
let currTurn = turns[0];
let pcSymbol = x;
let playerSymbol = o;

//### FUNCTIONS
const startTheGame = () => {
    Array.from(cells).forEach(cell => cell.innerText = "");
    endGamePanel.style.display = "none";
    return;
}
//### STATE FUNCTIONS
const getChangedTurn = (thisTurn) => {
    if (thisTurn === turns[0])
        return turns[1];
    else    
        return turns[0];
}
const fillCell = (cell, currSymbol) => {
    if (cell.innerText === "") {
        cell.innerText = currSymbol;
        return true;
    } else {
        return false;
    }
}
const isThereAWinner = (playedSymbol) => {
    
}

//### START THE GAME 
startTheGame();

//### LISTENERS
// Cells click event
cells.forEach(cell => cell.addEventListener("click", (e) => {
    // Get the symbol based on currTurn
    const currSymbol = 
        (currTurn === turns[0]) ? playerSymbol : pcSymbol;
    // Try to fill a cell
    const filled = fillCell(e.target, currSymbol);
    // Changed turn only on cell filled
    if (filled) {
        currTurn = getChangedTurn(currTurn);
    }
    isThereAWinner(currSymbol); 
}));
// reset btn click event
resetBtn.addEventListener("click", (e) => startTheGame());
// end game panel click event
endGamePanel.addEventListener("click", (e) => startTheGame());