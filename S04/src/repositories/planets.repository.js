
import Planet from "../models/planet.model.js";
import objectToDotNotation from "../libs/objectToDotNotation.js";
import dayjs from 'dayjs';

const ZERO_KELVIN = -273.15;

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

    create(planet)
    {
        return Planet.create(planet);
    }

    delete(idPlanet)
    {

        return Planet.findByIdAndDelete(idPlanet);

    }

    update(idPlanet, PlanetModif)
    {
        const planetToDotNotation = objectToDotNotation(PlanetModif);
        return Planet.findByIdAndUpdate(idPlanet, planetToDotNotation,  {new:true});


    }


    transform(planet, transformOptions = {}) 
    {
        if(transformOptions.unit)
        {
            switch(transformOptions.unit )
            {
                case 'c':
                    planet.temperature = planet.temperature + ZERO_KELVIN;
                    planet.temperature = parseFloat(planet.temperature.toFixed(2));
                    break;

            }

        }
        
        planet.discoveredDate = dayjs(planet.discoveredDate).format('YYYY-MM-DD');
        planet.lightspeed = `${planet.position.x.toString(16)}@${planet.position.y.toString(16)}#${planet.position.z.toString(16)}`
        delete planet.__v;

        return planet;


    }

    

    



}

export default new PlanetRepository();