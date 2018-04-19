// console.log(this);
var arr = [1,2,3,4,5,6,7,8]
console.log(arr)

var myCar2 = {
  maxSpeed: 70,
  driver: "Net Ninja",
  drive: function(speed, time) {
    console.log("Drive for: " + (speed * time) + " Km/h")
  },
  test: function () {
    console.log(this)
  },
  logDriver: function() {
    console.log("Driver name is " + this.driver);
  }
}
/*
var myCar3 = {
  maxSpeed: 120,
  driver: "Monster Truck",
  drive: function(speed, time) {
    console.log("Drive for: " + (speed * time) + " Km/h")
  },
  test: function () {
    console.log(this)
  }
}
*/
console.log("My car max speed is = "+myCar2.maxSpeed)
myCar2.drive(50,3)
myCar2.test()
myCar2.logDriver();
/*
console.log("My car max speed is = "+myCar3.maxSpeed)
myCar3.drive(70,5)
myCar3.test()
*/

var str = "freeCodeCamp"
var inverse = ""

for (let i = str.length-1; i >= 0; i--) {
  inverse += str[i]
}

console.log(str)
console.log(inverse)
