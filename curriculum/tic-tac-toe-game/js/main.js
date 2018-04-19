// CONSTANTS
const x = 'X'
const o = 'O'
const turns = ["pcTurn", "playerTurn"]

// STATE
let currentTurn = turns[1]

// ELEMENTS
const table = document.getElementById("gameTable")
const cells = table.getElementsByTagName("TD")
const resetBtn = document.getElementById("resetBtn")

// LISTENERS
Array.from(cells).forEach(cell => {
  cell.addEventListener("click", e => {
    // console.log(cell)
    if (cell.innerText === "") {
      if (currentTurn === turns[0]) {
        cell.innerText = x
        currentTurn = turns[1]
      } else {
        cell.innerText = o
        currentTurn = turns[0]
      }
    } else {
      return
    }
  })
})
resetBtn.addEventListener("click", e => {
  Array.from(cells).forEach(cell => cell.innerText = "")
})
document.addEventListener("DOMContentLoaded", e => {
  // console.log("I'm ready")
})
