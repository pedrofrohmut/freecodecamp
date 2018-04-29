/**
 * 1. A Closure is the combination of the function an the Environment 
 * whithin witch the function has been declared.
 * 
 * 2. The context where it was declared + the context inside the function
 * 
 */


function makeFunc()
{
    let name = "JS Nuggets"
    
    function displayName()
    {
        console.log(name)
        console.log(age)
    }
    return displayName
}

// You dont have to pass "age" as a parameter
let age = 30

let myFunc = makeFunc()
myFunc()

//*** Emulate private methods with closures ***
var counter = (function() { // The function is called as soon as it is declared
    var privateCounter = 0;
    // this method becomes private 
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function() {
        changeBy(1);
      },
      decrement: function() {
        changeBy(-1);
      },
      value: function() {
        return privateCounter;
      }
    };   
  })();
  
  console.log(counter.value()); // logs 0
  counter.increment();
  counter.increment();
  console.log(counter.value()); // logs 2
  counter.decrement();
  console.log(counter.value()); // logs 1