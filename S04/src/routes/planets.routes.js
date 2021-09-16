import express from "express";
import HttpError  from "http-errors";
import httpStatus from "http-status";
import HttpStatus from "http-status";
import planets from "../data/planets.js";
import PLANETS from "../data/planets.js"; // TOUTES les planètes sont dans la variable.
import planetsRepository from "../repositories/planets.repository.js";

const router = express.Router();
class PlanetsRoutes
{

    constructor()
    {
     // Définition des routes pour la ressource planet.
        router.get("/", this.getAll); // Retrieve (retrouve ) toutes les planètes
        router.get("/:idPlanet", this.getOne); // Retrieve(retrouve) une planetes
        router.post("/", this.post);// Pour create
        router.delete("/:idPlanet", this.deleteOne); //delete
        router.patch("/:idPlanet", this.patchOne); // Update
        router.put("/:idPlanet", this.putOne); // update
    }
     async getOne(req,res, next)
        {
            const idPlanet = req.params.idPlanet;
          try
          {

              //TODO: Voir dans la BD
              const planet = await planetsRepository.retrieveById(idPlanet);

              if(planet == undefined)
              {
                return next(HttpError.NotFound(`Votre planète au id suivant: ${idPlanet} n'existe pas `));
              }
              else
              {

                res.status(HttpStatus.OK);
                res.json(planet); // ça fait le content type et le send  
              }
          }
          catch(err)
          {

            return next(err);

          }

            
        }
         async getAll(req, res, next)
        {

            const filter = {};
            if(req.query.explorer)
            {
                filter.discoveredBy = req.query.explorer;
            }

             try 
             {
               
                const planets = await planetsRepository.retrieveALL(filter)
                res.status(httpStatus.OK).json(planets); // ou  res.status(200).json(planets);
             } 
             catch (err) 
             {
               return next(err)
             }

        }
        patchOne(req,res,next)
        {
            return next(HttpError.NotImplemented());

        }
        putOne(req,res,next)
        {

          return next(HttpError.NotImplemented());

        }

        

        post(req, res, next)
        {
          
          const newPlanet = req.body;

          const planet = PLANETS.find(p => p.id == newPlanet.id); // find retourne le premier élément qu'il trouve 
          if(planet)
          {
            return next(HttpError.Conflict(`Une planète avec l'identifiant ${newPlanet.id} est déjà présente.`));// J'ai un doublon == Error
          } 
          else
          {
              PLANETS.push(newPlanet);  // ajouter la requête dans le tableau si elle correspond
              res.status(HttpStatus.CREATED);//201
              res.json(newPlanet);
          }  
          

          

         
        }

        deleteOne(req,res,next)
        {
          const idPlanet = req.params.idPlanet;

          const index = PLANETS.findIndex(p => p.id == idPlanet);
          if(index === -1)
          {
            return next(HttpError.NotFound(`Votre planète au id suivant: ${idPlanet} n'existe pas `));
          }
          else
          {
              PLANETS.splice(index, 1);
              res.status(httpStatus.NO_CONTENT).end();

          }


        }
}


//Super important ne pas oublier ces 2 lignes.
new PlanetsRoutes();
export default router; // pour pouvoir l'utiliser on doit l'exporter.