import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';
import explorationsRepository from '../repositories/explorations.repository.js';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', paginate.middleware(20,50) ,this.getAll);
        router.get('/:explorationId', this.getOne);
    }

   async getAll(req, res, next) {

   const retrieveOptions = {
       skip:req.skip,
       limit: req.query.limit,
   }

       try 
       {
        let [explorations, itemCount] = await explorationsRepository.retrieveALL(retrieveOptions);
        const pageCount = Math.ceil(itemCount/retrieveOptions.limit); 
       const hasNextPage = paginate.hasNextPages(req)(pageCount); // Une fonction qui retourne une fonction 
       const pageArray = (paginate.getArrayPages(req))(3, pageCount, req.query.page);
       console.log(pageArray);
                
        explorations = explorations.map(e =>{
            e = e.toObject({getters:true, virtuals:false}); // permet de modifier l'objet
            e = explorationsRepository.transform(e);
            return e;
        });

        const response = {
            _metadata:
            {
                hasNextPage: hasNextPage,
                page: req.query.page,
                limit: req.query.limit,
                skip: req.skip,
                totalPages: pageCount,
                totalDocuments: itemCount
            },
            _links:{
                first:`/exploration?page=1&limit=${req.query.limit}`,
                prev:pageArray[0].url,
                self:pageArray[1].url,
                next:pageArray[2].url,
                last:`/exploration?page=${pageCount}&limit=${req.query.limit}`,
            },
            data:explorations
        };
        if(req.query.page === 1)
        {
            delete response._links.prev;
            response._links.self =pageArray[0].url;
            response._links.next = pageArray[1].url;
        }

        if(!hasNextPage)
        {
            delete response._links.next;
            response._links.prev =pageArray[1].url;
            response._links.self = pageArray[2].url;

        }

        
        res.status(200).json(response);
       } 
       catch (err) 
       {

         return next(err);

       }
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