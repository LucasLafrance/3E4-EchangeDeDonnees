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


app.get("/somme", (req, res)=>{

//console.log(req.query);

const a =  parseInt(req.query.a, 10) ;
const b = parseInt(req.query.b, 10);

res.status(200);// il dit que ça fonctionne
res.set("Content-Type", "text/html"); // Il dit qu'il va lui envoie du texte plain. "normal"
res.send(`<strong>${a+b}`); // est la même chose que la ligne 22
//res.send((a+b).toString());


});
export default app;