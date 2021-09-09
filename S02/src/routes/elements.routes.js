import express from 'express';
import HttpErrors from 'http-errors';
import httpStatus from 'http-status';
import HttpStatus from "http-status";
import elements from '../data/elements.js';

import ELEMENTS from "../data/elements.js"; // TOUTES les éléments sont dans la variable.

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
        res.status(HttpStatus.OK);
        res.set("Content-Type", " application/json");

        res.send(ELEMENTS);
    }

    getOne(req, res, next) {
       const symbolElement = req.params.symbol;
       const element = ELEMENTS.find(e => e.symbol == symbolElement);
       console.log(element);

       if(!element)
       {
        return next(HttpErrors.NotFound(`Votre élément au symbole suivant: ${symbolElement} n'existe pas `));
       }
       else
       {
        res.status(HttpStatus.OK);
        res.json(element); // ça fait le content type et le send 

       }


    }

    post(req, res, next) {
        const newElement = req.body;
        const element = ELEMENTS.find(e => e.symbol == newElement.symbol)

        if(element)
        {
            return next(HttpError.Conflict(`Un élément avec le symbole ${newElement.symbolElement} est déjà présente.`))// J'ai un doublon == Error      
        }
        else
        {
           ELEMENTS.push(newElement);
           res.status(HttpStatus.CREATED);//201
           res.json(newElement);     

        }
        
    }
    
    delete(req, res, next) {
        const symbolElement = req.params.symbol;

        const index = ELEMENTS.findIndex(e => e.symbol == symbolElement);
        if(index === -1)
        {
          return next(HttpErrors.NotFound(`Votre éléments au symbole suivant: ${symbolElement} n'existe pas `));
        }
        else
        {
            ELEMENTS.splice(index, 1);
            res.status(httpStatus.NO_CONTENT).end();

        }
     
    }
}

new ElementsRoutes();

export default router;