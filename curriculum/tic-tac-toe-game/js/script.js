//### ELEMENTS
const showCurrTurnPanel = document.getElementById("showCurrTurn");
const resetBtn = document.getElementById("resetBtn");
const table = document.getElementById("gameTable");
const endGamePanel = document.getElementById("endGamePanel");
const chooseSymbolPanel = document.getElementById("chooseSymbolPanel");

const cells = 
    Object.freeze(Array.from(table.getElementsByClassName("cell")));

//### CONSTANTS
const x = "X";
const o = "O";
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
let playerSymbol = x;
let pcSymbol = o;
let gameEnded = false;

//### FUNCTIONS
const displayChooseSymbolPanel = () => {
    chooseSymbolPanel.classList.remove("hidden");
}
const hideChooseSymbolPanel = () => {
    chooseSymbolPanel.classList.add("hidden");
}
const hideShowCurrTurnPanel = () => {
    showCurrTurnPanel.classList.add("hidden");
}
const displayShowCurrTurnPanel = () => {
    showCurrTurn(currTurn);
    showCurrTurnPanel.classList.remove("hidden");
}
const hideEndGamePanel = () => {
    endGamePanel.classList.remove("win-game");
    endGamePanel.classList.remove("game-over");
    endGamePanel.classList.add("hidden");
}
const displayWinGamePanel = (playedSymbol) => {
    endGamePanel.classList.remove("hidden");
    endGamePanel.classList.add("win-game");
    endGamePanel.innerText = playedSymbol + " is the winner";
}
const displayGameOverPanel = () => {
    endGamePanel.classList.remove("hidden");
    endGamePanel.classList.add("game-over");
    endGamePanel.innerText = "Game Over";
}

//### STATE FUNCTIONS
// setup
const setup = () => {
    // displayShowCurrTurnPanel(); //temp##
    hideEndGamePanel();
    hideShowCurrTurnPanel();
    displayChooseSymbolPanel();
}
// starts and restarts the game
const startTheGame = () => {
    // set-reset the turn
    currTurn = turns[0];
    // clears the game table
    Array.from(cells).forEach(cell => cell.innerText = "");
    // let the game available to play again (update global state)
    gameEnded = false;
    // updates the panel that shows whos turn it is
    showCurrTurn(currTurn);
    // hide the end game panel
    hideEndGamePanel();
    return;
}
// get the new turn from turns based on the passed turn
const getChangedTurn = (thisTurn) => {
    if (thisTurn === turns[0])
        return turns[1];
    else    
        return turns[0];
}
// fill the cell passed with the symbol passed if its is empty
const fillCell = (cell, currSymbol) => {
    if (cell.innerText === "") {
        cell.innerText = currSymbol;
        return true;
    } else {
        return false;
    }
}
// checks the inner text of cells of cells array (table content) and checks if it match one of the conditions stored on the winConditions array (constant the inform what are the conditions to win)
const isThereAWinner = (playedSymbol) => {
    // interates trougth global array of win conditions
    for (let thisWinCondition of winConditions) {
        // checks if the passed param maches one of the conditions
        if (
            playedSymbol === cells[thisWinCondition[0]].innerText &&
            playedSymbol === cells[thisWinCondition[1]].innerText &&
            playedSymbol === cells[thisWinCondition[2]].innerText 
        ) {
            // Display and change the text to match the played symbol
            displayWinGamePanel(playedSymbol);
            // updates the state
            gameEnded = true;
            return true;
        }
    }
    return false;
}
// Checks if all table cells are filled
const isTheGameOver = () => {
    for (let cell of cells) {
        if (cell.innerText === "") {
            return false;
        }
    }
    displayGameOverPanel();
    // updates the state
    gameEnded = true;
    return true;
}
const showCurrTurn = (thisTurn) => {
    showCurrTurnPanel.classList.remove("hidden");
    showCurrTurnPanel.classList.remove("curr-turn-0");
    showCurrTurnPanel.classList.remove("curr-turn-1");
    if (thisTurn === turns[0]) {
        showCurrTurnPanel.classList.add("curr-turn-0");
        showCurrTurnPanel.innerHTML = `
        <strong>${playerSymbol}</strong> turn`;
    } else {
        showCurrTurnPanel.classList.add("curr-turn-1");
        // showCurrTurnPanel.innerText = pcSymbol + "turn";
        showCurrTurnPanel.innerHTML = `
        <strong>${pcSymbol}</strong> turn`;
    }
    return;
}

//### START THE GAME 
setup();
// startTheGame();

//### LISTENERS
// Cells click event
cells.forEach(cell => cell.addEventListener("click", (e) => {
    if (gameEnded === false) {
        // Get the symbol based on currTurn
        const currSymbol = 
            (currTurn === turns[0]) ? playerSymbol : pcSymbol;
        // Try to fill a cell
        const filled = fillCell(e.target, currSymbol);
        // Changed turn and check only when cell filled
        if (filled) {
            // update current turn state
            currTurn = getChangedTurn(currTurn);
            showCurrTurn(currTurn);
            if (!isThereAWinner(currSymbol)) {
                // checks if the game is over when there's no winners
                isTheGameOver();
            }
        }
    }
}));
// reset btn click event
resetBtn.addEventListener("click", (e) => setup());
// end game panel click event
endGamePanel.addEventListener("click", (e) => startTheGame());
// choose button clicked
chooseSymbolPanel.addEventListener("click", (e) => {
    // Capture Event Bubbling
    if (e.target.innerText === x || e.target.innerText === o) {
        // Set the player's Symbol
        if (e.target.innerText === x) {
            playerSymbol = x;
            pcSymbol = o;
        } else {
            playerSymbol = o;
            pcSymbol = x;
        }
        hideChooseSymbolPanel();
        startTheGame();
    }
});