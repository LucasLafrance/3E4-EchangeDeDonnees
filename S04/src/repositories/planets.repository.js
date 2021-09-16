import Planet from "../models/planet.model.js";
class PlanetRepository
{
    retrieveById(idPlanet)
    {
       return Planet.findById(idPlanet)



    }

    retrieveALL(filter)
    {
        //Équivalent des WHERE en SQL
        const testFilter = {
            discoveredBy:"Skadex",
            temperature: {$gt:240},
            'position.y': {$lt:500}
        }
        //WHERE discoverdBy "Skadex" AND temperature > 240 AND position.y = 500
        const testFilterOr = 
        {
            $or:[{ discoveredBy:"Skadex"},
            { temperature: {$gt:240}},
            {'position.y': {$lt:500}}]


        }


        return Planet.find(filter);
    }


}

export default new PlanetRepository();