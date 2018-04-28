/**
 * 
 */

//*** Class declaration ***
class Person1 
{
    constructor (name, yearBorn) 
    {
        this.name = name;
        this.yearBorn = yearBorn;
    };

    get age() // calls a prop not a func
    {
        return this.calcAge();
    };

    calcAge()
    {
        return new Date().getFullYear() - this.yearBorn;
    };

    what()
    {
        return `${this.name} is a Person.`;
    };

    static arms()
    {
        return 2;
    }
};

let me = new Person1("Beau", 1983);

// Getting props || attr
console.log(`${me.name} was born in ${me.yearBorn}!`);

// Calling methods
console.log(me.what());

// Static props
console.log(`${me.name} has ${Person1.arms()} arms!`);

class Juggler extends Person1 
{
    what() 
    {   
        // Call Juggler's parent method === Person1.what()
        super.what();
        // Juggler does NOT have prop name but it take from Person1 - parent
        return `${this.name} is a juggler.`;
    };
};

let you = new Juggler("Jay", 1980);
console.log(me.what());
console.log(you.what());

//*** Class expression ***
const Person2 = class
{
    constructor (name, age) 
    {
        this.name = name;
        this.age = age;
    };
};

const Person3 = class Person1
{

}