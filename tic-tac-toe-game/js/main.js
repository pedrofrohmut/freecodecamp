//### ELEMENTS
const showCurrTurnPanel = document.getElementById("showCurrTurn");
const resetBtn = document.getElementById("resetBtn");
const table = document.getElementById("gameTable");
const endGamePanel = document.getElementById("endGamePanel");
const chooseSymbolPanel = document.getElementById("chooseSymbolPanel");
const cells = Object.freeze(Array.from(table.getElementsByClassName("cell")));

//### GAME CONSTANTS
const x = "X";
const o = "O";
const turns = Object.freeze(["playerTurn", "pcTurn"]);

//### STATE
let board;
let pcSymbol;
let playerSymbol;

//### LISTENERS
// Cells click event
cells.forEach(cell => cell.addEventListener("click", e => playerMakeAPlay(e)));
resetBtn.addEventListener("click", e => setup());
endGamePanel.addEventListener("click", e => startTheGame());
chooseSymbolPanel.addEventListener("click", e => setupThePlayerAndPcSymbols(e));

//### CSS CLASSES CONSTANTS
const cssDisplayNone = "display-none";
const cssWinGame = "win-game";
const cssGameOver = "game-over";
const cssLoseGame = "lose-game";
const cssCurrTurn0 = "curr-turn-0";
const cssCurrTurn1 = "curr-turn-1";

//### Functions: Display and Hide
function displayChooseSymbolPanel () {
    chooseSymbolPanel.classList.remove(cssDisplayNone);
}
function hideChooseSymbolPanel () {
    chooseSymbolPanel.classList.add(cssDisplayNone);
}
function hideShowCurrTurnPanel () {
    showCurrTurnPanel.classList.add(cssDisplayNone);
}
function displayShowCurrTurnPanel () {
    showCurrTurnPanel.classList.remove(cssDisplayNone);
}
function hideEndGamePanel () {
    endGamePanel.classList.remove(cssWinGame);
    endGamePanel.classList.remove(cssGameOver);
    endGamePanel.classList.remove(cssLoseGame);
    endGamePanel.classList.add(cssDisplayNone);
}
function displayWinGamePanel (playedSymbol, thisPlayerSymbol) {
    endGamePanel.classList.remove(cssDisplayNone);
    if (playedSymbol === thisPlayerSymbol) {
        endGamePanel.classList.add(cssWinGame);
        endGamePanel.innerText = "You Win";
    } else {
        endGamePanel.classList.add(cssLoseGame);
        endGamePanel.innerText = "You Lose";
    }
}
function displayGameOverPanel () {
    endGamePanel.classList.remove(cssDisplayNone);
    endGamePanel.classList.add(cssGameOver);
    endGamePanel.innerText = "Game Over";
}

//### Event Handler Functions
function playerMakeAPlay(e) {    
    const finishedMatch = isThisMatchFinished(board, playerSymbol, pcSymbol);
    if (finishedMatch) return;

    const validCell = fillCell(e.target, playerSymbol);
    if(!validCell) return;

    const playerWon = isThereAWinner(board, playerSymbol, playerSymbol);
    if (playerWon) return;

    const gameOver = isTheGameOver(board);
    if (gameOver) return;

    pcMakeAPlay(board, pcSymbol, playerSymbol);
}
function setup() {
    hideEndGamePanel();
    hideShowCurrTurnPanel();
    displayChooseSymbolPanel();
    board = getNewBoard();
    cleanCellsText(cells);
}
function startTheGame() {
    hideEndGamePanel();
    showCurrTurnOnPanel(turns[0], playerSymbol, showCurrTurnPanel); // playerTurn
    board = getNewBoard();
    cleanCellsText(cells);
}
function setupThePlayerAndPcSymbols(e) {
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
}

//### Support Functions
function showCurrTurnOnPanel(thisTurn, thisSymbol, panel) {
    displayShowCurrTurnPanel();
    panel.classList.remove(cssCurrTurn0);
    panel.classList.remove(cssCurrTurn1);
    panel.classList.add( (thisTurn === turns[0]) ? cssCurrTurn0 : cssCurrTurn1 );
    panel.innerHTML = `<strong>${thisSymbol}</strong> Turn`;
}
function getNewBoard() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
}
function cleanCellsText (thisCells) {
    thisCells.forEach(cell => cell.innerText = "");
}
function fillCell (cell, thisSymbol) {
    if (cell.innerText === "") {
        const clickedIndex = cells.findIndex(thisCell => thisCell === cell);
        board[clickedIndex] = thisSymbol;
        cell.innerText = thisSymbol;
        return true;
    } else {
        return false;
    }
}
function isThereAWinner (thisBoard, thisSymbol, thePlayerSymbol) {
    if (testWinner(thisBoard, thisSymbol)) {
        displayWinGamePanel(thisSymbol, thePlayerSymbol);
        return true;
    } else {
        return false;
    }
}
function isTheGameOver (thisBoard) {
    const thisGameIsOver = getFreeCells(thisBoard).length === 0;
    if (thisGameIsOver) {
        displayGameOverPanel();
        return true;
    } else {
        return false;
    }
}
function isThisMatchFinished (thisBoard, thePlayerSymbol, thePcSymbol) {
    const finished =  isThereAWinner(thisBoard, thePlayerSymbol, thePlayerSymbol) || 
                      isThereAWinner(thisBoard, thePcSymbol, thePlayerSymbol)     || 
                      isTheGameOver(thisBoard);
    return finished;
}
function getFreeCells (thisBoard) {
    return thisBoard.filter(cell => typeof cell === "number");
}
function pcMakeAPlay (thisBoard, thePcSymbol, thePlayerSymbol) {
    const index = minmax(thisBoard, pcSymbol).index;
    const validCell = fillCell(cells[index], pcSymbol);
    if (!validCell) return;

    const winner = isThereAWinner(thisBoard, thePcSymbol, thePlayerSymbol);
    if (winner) return;

    const gameOver = isTheGameOver(thisBoard);
    if (gameOver) return;
}
function testWinner(newBoard, thisSymbol) {
    if (
        // Horizontal
        (newBoard[0] === thisSymbol && newBoard[1] === thisSymbol && newBoard[2] === thisSymbol) ||
        (newBoard[3] === thisSymbol && newBoard[4] === thisSymbol && newBoard[5] === thisSymbol) ||
        (newBoard[6] === thisSymbol && newBoard[7] === thisSymbol && newBoard[8] === thisSymbol) ||
        // Vertical
        (newBoard[0] === thisSymbol && newBoard[3] === thisSymbol && newBoard[6] === thisSymbol) ||
        (newBoard[1] === thisSymbol && newBoard[4] === thisSymbol && newBoard[7] === thisSymbol) ||(newBoard[2] === thisSymbol && newBoard[5] === thisSymbol && newBoard[8] === thisSymbol) ||
        // Diagonal
        (newBoard[0] === thisSymbol && newBoard[4] === thisSymbol && newBoard[8] === thisSymbol) ||
        (newBoard[2] === thisSymbol && newBoard[4] === thisSymbol && newBoard[6] === thisSymbol)
    ) {
        return true;
    } else {
        return false;
    }
}
function minmax(thisBoard, thisSymbol) {
    // Free Cells To Play
    const freeSpots = thisBoard.filter(spot => typeof spot === "number");

    // BASE CASES
    if (testWinner(thisBoard, playerSymbol)) return { score: -10 };
    if (testWinner(thisBoard, pcSymbol))     return { score: 10 };
    if (freeSpots.length === 0)              return { score: 0 };

    let moves = [];

    // Cada loop define a posicao que ira comecar
    for (let i = 0; i < freeSpots.length; i++) {
        // Create a move
        let move = { index: freeSpots[i], score: 0 }
        // current player make a play
        thisBoard[freeSpots[i]] = thisSymbol;

        if (thisSymbol === pcSymbol) 
            move.score = minmax(thisBoard, playerSymbol).score;
        else 
            move.score = minmax(thisBoard, pcSymbol).score;
        
        thisBoard[freeSpots[i]] = move.index;

        moves.push(move);
    }

    let bestMove;
    if (thisSymbol === pcSymbol) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

//### Initialization
setup();