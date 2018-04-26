/**
 *  OBJECTS_2
 */
// Using Objects for lookups
const alpha = {
    1: "Z",
    2: "Y",
    3: "X",
    4: "W"
}

console.log(alpha[1]) // "Z"

// Removing Objects Properties
const dishes = {
    plates: 8,
    cups: 10,
    forks: 28,
    bowls: 13
}

delete dishes.cups

console.log(dishes)

// Testing Objects for Properties
console.log(dishes.hasOwnProperty("plates")) // true
console.log(dishes.hasOwnProperty("cups")) // false

// Accessing and Modifying Nested Objects
const ourStorage = {
    "desk": {
        "drawer": "stapler"
    },
    "cabinet": {
        "top drawer": {
            "folder1": "a file",
            "folder2": "secrets"
        },
        "bottom drawer": "soda"
    }
}
console.log(ourStorage.cabinet["top drawer"].folder2) // "secrets"
console.log(ourStorage.desk.drawer) // "stapler"
ourStorage.cabinet["top drawer"].folder2 = "cake recipe" 
console.log(ourStorage.cabinet["top drawer"].folder2) // "cake recipe"

// Generate an Array of All Object Keys
console.log(Object.keys(ourStorage)) // ["desk", "cabinet"]