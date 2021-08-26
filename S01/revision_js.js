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
console.log(("b"+"a"+ +"a"+"a"));

function displayUser(prenom, age ){

     
    console.log(`\n Bonjour je m'appelle ${prenom} et j'ai ${age} ans`);
        
}
displayUser("Lucas", 20);

const fruits = ["Kiwi", "Fraise", "Banane", "Framboise", "Mangue"];

for(let fruit of fruits){

    console.log(fruit);
}
    
