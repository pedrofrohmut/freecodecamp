/**
 * OBJECTS_1
 */

let myCar = new Object()

myCar.make = "Ford" // dot notation
myCar.model = "Mustang"
myCar.color

myCar["year"] = 1969 // bracket notation

// you can use spaces with the bracket notation
myCar["Do you like?"] = "I hate my car"  

function showProps(obj, objName) {
    let result = ""
    for (var i in obj) 
        // obj.hasOwnProperty() is used to filter out properties 
        // from the object's prototype chain
        if (obj.hasOwnProperty(i)) 
            result += `${objName}.${i} = ${obj[i]} \n`
    return result
}

console.log(showProps(myCar, "myCar"))

// Creation: object initializer
let myHonda = {
    color: "red", 
    wheels: 4, 
    engine: {
        cylinders: 4,
        size: 2.2
    } 
}

// Creation: constructor function
function Car (make, model, year) {
    this.make = make
    this.model = model 
    this.year = year 
}
let myChevy = new Car("Chevy", "Malibu", 1993)
let myMadza = new Car("Madza", "Miata", 1990)

// Creation: Object.create
let Animal = {
    type: "Invertebrates", // default option for animal
    displayType: function () { // method
        console.log(this.type) // this referes to the inner Animal context
    }
}

let animal1 = Object.create(Animal) // You pass in the Animal prototype
animal1.displayType() // "Invertebrates"

let fish = Object.create(Animal)
fish.type = "Fische" // rewrite the default
fish.displayType() // "Fische"