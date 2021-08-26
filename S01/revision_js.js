const firstName = "Lucas";
console.log(firstName);

let age = 33;
age++;
console.log(age);

const test = true + 1;
console.log(test);
const test2 = false + 1;
console.log(test2);
const test3 = true + false;
console.log(test3);
const test4 = true * false;
console.log(test4);
const test5 = 125 + "9";
console.log(test5);
console.log(("b" + "a" + +"a" + "a"));

function displayUser(prenom, age) {


    console.log(`\n Bonjour je m'appelle ${prenom} et j'ai ${age} ans`);

}
displayUser("Lucas", 20);

const fruits = ["Kiwi", "Fraise", "Banane", "Framboise", "Mangue"];

for (let fruit of fruits) {

    console.log(fruit);
}

fruits.push("Pomme");
console.log("=====================");

fruits.forEach(fruit => console.log(fruit));

const sum = (a, b) => a + b;

// La sum est fait avec c'est 2 nombres
const result = sum(12, 8);
console.log(result);

//Va filtrer ce qui est vrai ou non selon la condition
const filtre = fruits.filter(f => f.length > 5);
console.log(filtre);


const numbers = [10, 20, 30, 40];
const MULTIPLIER = 3;

// map va multiplier les nombres par MULTIPLIER(3) et va nous sortir ce qui est vrai à la condition de filter
const products = numbers.map(n => n * MULTIPLIER).filter(n => n > 75);

console.log(products);
console.log(numbers);

//Création d'objets
const spiderman = {
    hero: "Spiderman",
    alterEgo: "Peter Parker",
    movies:[{title:"Spiderman 1"},{title:"Spiderman 2"},{title:"Spiderman 3"}]
}

const ironman = {
    
    hero: "Ironman",
    alterEgo: "Tony Stark",
    movies:[{title:"Ironman 1"},{title:"Ironmann 2"},{title:"Ironman 3"}]
}

//Création de la class Avenger
class Avenger{

    constructor(hero, alterEgo, movies){
        this.hero = hero;
        this.alterEgo = alterEgo;
        this.movies =movies;



    }

        test(){

        }
}

const oneAvenger = new Avenger("Hulk", "Bruce Baner", [{title:"Hulk 1"},{title:"Hulk 2"},{title:"Hulk 3"}])
console.log(oneAvenger.hero);
console.log(spiderman.hero);
