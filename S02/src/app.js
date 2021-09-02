import express from "express";
import dayjs from "dayjs";

const app = express();


app.get("/premiere", (req, res)=>{

    res.status(200);// il dit que ça fonctionne
    res.set("Content-Type", "text/plain"); // Il dit qu'il va lui envoie du texte plain. "normal"
    res.send("Notre première route avec express");

}); //req est la requete et la res est la response


app.get("/date", (req, res) =>{

    res.status(200);// il dit que ça fonctionne
    res.set("Content-Type", "text/plain"); // Il dit qu'il va lui envoie du texte plain. "normal"
    res.send(dayjs().format("YYYY-MM-DD HH:mm:ss")); // Va rechercher la date présente

});

// maths/somme 
// maths/difference
// maths/produit
// maths/quotient
// maths/reste

app.get("/maths/:operation", (req, res)=>{

    const operation = req.params.operation;
    console.log(operation);

    const a =  parseInt(req.query.a, 10) ;
    const b = parseInt(req.query.b, 10);
    let result = 0;
switch(operation) {

    case 'somme':
        result = a+b;
        break;
    case 'difference':
        result = a-b;
        break; 
    case 'produit':
        result = a*b;
        break;
    case 'quotient':
        result = a/b;
        break;
    case 'reste':
        result = a%b;
        break;
    default:
   // return res.status(400).end();
    return res.send("Opération non reconnue!").end();

}

//console.log(req.query);



res.status(200);// il dit que ça fonctionne
res.set("Content-Type", "text/html"); // Il dit qu'il va lui envoie du texte plain. "normal"
res.send(`<strong>${result}`); // est la même chose que la ligne 22
//res.send((a+b).toString());


});
export default app;