import express from "express";
import PLANETS from "../data/planets.js"; // TOUTES les planètes sont dans la variable.
import HttpError  from "http-errors";
import httpStatus from "http-status";


const router = express.Router();
class PlanetsRoutes
{

    constructor()
    {
     // Définition des routes pour la ressource planet.
        router.get("/planets", this.getAll); // Retrieve (retrouve ) toutes les planètes
        router.get("/planets/:idPlanet", this.getOne); // Retrieve(retrouve) une planetes
        router.post("/planets", this.post);
    }
        getAll(req, res, next)
        {
             res.status(200);
             res.set("Content-Type", " application/json");

             res.send(PLANETS);

        }

        getOne(req,res, next)
        {
            const idPlanet = req.params.idPlanet;
            //1.La planete existe pas = 200
            const planet = PLANETS.find(p => p.id ==idPlanet); // find retrouve le premier élément qu'il trouve
            console.log(planet)


            if(planet == undefined)
            {
               return next(HttpError.NotFound(`Votre planète au id suivant: ${idPlanet} n'existe pas `))
            }
            else
            {

              res.status(200);
              res.json(planet); // ça fait le content type et le send  
            }
            

             //2.La planete existe pas = 404

            
        }

        post(req, res, next)
        {

            
        }
}


//Super important ne pas oublier ces 2 lignes.
new PlanetsRoutes();
export default router; // pour pouvoir l'utiliser on doit l'exporter.