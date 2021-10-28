import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {
    
    retrieveById(idExploration, retrieveOptions)
    {
        const retrieveQuery =  Exploration.findById(idExploration);

        if (retrieveOptions.planet) {
            retrieveQuery.populate('planet')
        }
        return retrieveQuery;
    }

    transform(exploration  , transformOptions = {})
    {
       if(transformOptions.embed && transformOptions.embed.planet)
       {
         //?embed=planet

       }
       else
       {
           //Quand on ne veut pas la planet
            exploration.planet = { href: `/planets/${exploration.planet}`};
       }
         
       //Choix pour le base URL
       // exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;

        exploration.href= `/explorations/${exploration._id}`;

        delete exploration._id;

        return exploration;

    }
}

export default new ExplorationsRepository();