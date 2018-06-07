//### Catchers ################################################################
const counter           = document.getElementById('counter')
const start             = document.getElementById('start')
const stop              = document.getElementById('stop')
const reset             = document.getElementById('reset')
const shortBreakLength  = document.getElementById('shortBreakLength')
const longBreakLength   = document.getElementById('longBreakLength')
const pomodoroLength    = document.getElementById('pomodoroLength')
const plusSB            = document.getElementById('plusSB')
const plusLB            = document.getElementById('plusLB')
const plusPomo          = document.getElementById('plusPomo')
const menusSB           = document.getElementById('menusSB')
const menusLB           = document.getElementById('menusLB')
const menusPomo         = document.getElementById('menusPomo')
const displaySB         = document.getElementById('shortBreakLength')
const displayLB         = document.getElementById('longBreakLength')
const displayPomo       = document.getElementById('pomodoroLength')
const sbRadio           = document.getElementById('sbRadio')
const lbRadio           = document.getElementById('lbRadio')
const pomoRadio         = document.getElementById('pomoRadio')
const typeOfDisplay     = document.getElementsByName('counterFor')
//### Constants ###############################################################
const SECOND = 1000
const MINUTE = 60 * SECOND
//### Variables ###############################################################
let shortBreakTime = parseInt(shortBreakLength.innerHTML)
let longBreakTime  = parseInt(longBreakLength.innerHTML)
let pomodoroTime   = parseInt(pomodoroLength.innerHTML) // 25 * minute
let countInterval
// let count = pomodoroTime
let seconds
let minutes
//### Initiate ################################################################
counter.innerHTML = pomodoroTime + ":00"
//### Functions ###############################################################
const countDown = () => {
  // stops the interval when the count reaches 0 (zero)
  if (minutes === 0 && seconds === 0) {
    clearInterval(countInterval)
    //TODO: make something when the pomodoro is over
  }
  // when it is bigger than 0 (zero) the count continues
  else {
    let output = counter.innerHTML
    // to decrease the minutes when seconds get to 0 (zero)
    if (seconds > 0) {
      seconds--
    }
    else {
      seconds = 59
      minutes--
    }
    // output format for seconds smaller than 10 (ten)
    if (seconds < 10) {
      output = minutes + ':0' + seconds
    }
    else {
      output = minutes + ':' + seconds
    }
    counter.innerHTML = output
  }
}
const startCount = () => {
  let output = counter.innerHTML
  seconds = output.slice(output.length-2, output.length)

  if (output.length === 4) {
    minutes = output.slice(0, 1)
  }
  else {
    minutes = output.slice(0, 2)
  }
  clearInterval(countInterval)
  countInterval = setInterval(countDown, 1000)//30) //SECOND)
}
const stopCount = () => {
  clearInterval(countInterval)
}
const resetCount = () => {
  clearInterval(countInterval)
  if (sbRadio.checked === true) {
    minutes = parseInt(shortBreakLength.innerHTML)
    seconds = 0
  } else
  if (lbRadio.checked === true) {
    minutes = parseInt(longBreakLength.innerHTML)
    seconds = 0
  } else
  if (pomoRadio.checked === true) {
    minutes = parseInt(pomodoroLength.innerHTML)
    seconds = 0
  }
  counter.innerHTML = minutes + ':00'
}
const plusPomoMin  = () => displayPomo.innerHTML = parseInt(displayPomo.innerHTML) + 1
const plusSBMin    = () => displaySB.innerHTML = parseInt(displaySB.innerHTML) + 1
const plusLBMin    = () => displayLB.innerHTML = parseInt(displayLB.innerHTML) + 1
const menusPomoMin = () => displayPomo.innerHTML = parseInt(displayPomo.innerHTML) - 1
const menusSBMin   = () => displaySB.innerHTML = parseInt(displaySB.innerHTML) - 1
const menusLBMin   = () => displayLB.innerHTML = parseInt(displayLB.innerHTML) - 1
const counterSelect = (e) => {
  clearInterval(countInterval)
  if (e.target.name === 'counterFor') {
    if (e.target.value === 'shortBreak') {
      counter.innerHTML = shortBreakLength.innerHTML + ':00'
    } else
    if (e.target.value === 'longBreak') {
      counter.innerHTML = longBreakLength.innerHTML + ':00'
    } else
    if (e.target.value === 'pomodoro') {
      counter.innerHTML = pomodoroLength.innerHTML + ':00'
    }
  }
}
//### Listeners ###############################################################
start     .addEventListener('click', startCount)
stop      .addEventListener('click', stopCount)
reset     .addEventListener('click', resetCount)
plusSB    .addEventListener('click', plusSBMin)
plusLB    .addEventListener('click', plusLBMin)
plusPomo  .addEventListener('click', plusPomoMin)
menusSB   .addEventListener('click', menusSBMin)
menusLB   .addEventListener('click', menusLBMin)
menusPomo .addEventListener('click', menusPomoMin)

Array.from(typeOfDisplay)
  .forEach(radio =>
    radio .addEventListener('click', e => counterSelect(e)))
