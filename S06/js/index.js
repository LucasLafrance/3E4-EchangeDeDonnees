const SERVICE_URL = "https://api.andromia.science/planets/";

$(document).ready(()=>{

    getPlanets();

});

async function getPlanets() 
{

    try{
       const response =  await axios.get(SERVICE_URL); // obtient tout les planetes
        if (response.status === 200) {
                const planets = response.data;
                console.log(planets);
                planets.forEach(p => {
                    $("#planets").append(displayPlanet(p))
                });
        }
        else{
            console.log(response);
        }
        

    }
    catch(err){
        console.log(err);
    }

}

function displayPlanet(planet){

    let planetHtml = '<div class ="card col-2">'; // card fait une bordure fait ronde
    planetHtml += `<a href="details.html"><img src="${planet.icon}"/></a>`

    planetHtml += `<a href="details.html"><h5 class="nom-planet">${planet.name}</h5></a>`

    

    planetHtml += "</div> "; // le += permet d'ajouter


    return planetHtml;
    
}