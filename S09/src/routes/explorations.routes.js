import express from 'express';
import HttpError from 'http-errors';
import explorationsRepository from '../repositories/explorations.repository.js';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    getAll(req, res, next) {

    }

 async getOne(req, res, next) {
        
    const retrieveOptions= {};
    const transformOptions = {embed:{}};
        if(req.query.embed && req.query.embed === 'planet')
        {
            retrieveOptions.planet = true;
            transformOptions.embed.planet = true;
        }
        const idExploration = req.params.explorationId;
        try {
            let exploration = await explorationsRepository.retrieveById(idExploration, retrieveOptions);
            if(!exploration)
            {
                return next(HttpError.NotFound(`L'exploration ${idExploration} n'existe pas`));
            }
            exploration = exploration.toObject({getters:false, virtuals:false});
          
            exploration = explorationsRepository.transform(exploration, transformOptions);

            res.status(200).json(exploration);
            
        } catch (err) {
            return next(err);
        }
    }

}

new ExplorationsRoutes();

export default router;