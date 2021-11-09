import expressValidator from 'express-validator';
const {body} = expressValidator;
class PlanetValidator {
    complete() 
    {
        //Post et Put
        return[
          
            body('name').exists().withMessage("Le nom de la planète est obligatoire."),
            body('discoveryDate').exists().withMessage("La date de découverte est requise."),
            body('temperature').exists().withMessage("La température est requise."),
            body('position.x').exists().withMessage("La position en x est requise."),
            body('position.y').exists().withMessage("La position en y est requise."),
            body('position.z').exists().withMessage("La position en z est requise."),
            ... this.partial(), 
        ];
    }

    partial()
    {
        //Patch

        return [
            body ('discoveryDate').optional()
            .isISO8601().withMessage('Doit être une date.').bail()
            .isBefore(new Date().toISOString()).withMessage("Doit être une date antérieure à aujourd'hui"),
            body ('temperature').optional()
            .isNumeric().withMessage("La valeur de la température doit être un nombre."),
            body('satellites').optional()
            .isArray().withMessage("Les satellites doivent être dans un tableau."),
            body('position.x').optional()
            .isFloat({min: -1000, max:1000}).withMessage("La position en x doit être un nombre ainsi qu'être entre -1000 et 1000."),
            body('position.y').optional()
            .isFloat({min: -1000, max:1000}).withMessage("La position en y doit être un nombre ainsi qu'être entre -1000 et 1000."),
            body('position.z').optional()
            .isFloat({min: -1000, max:1000}).withMessage("La position en z doit être un nombre ainsi qu'être entre -1000 et 1000."),


        ];
    }
}
export default new PlanetValidator();