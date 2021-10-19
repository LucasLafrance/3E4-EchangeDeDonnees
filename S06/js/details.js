const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(() =>{



getPlanet(urlParams.planet)
$('#btnAddPortal').click(()=>{
    addPortal();
});

$('#btnMiner').click(()=>{
    minePlanet();
});

});
async function minePlanet()
{
    //GET
    const MINING_URL =`${urlParams.planet}/actions?type=mine` ;
    const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements';
    const response = await axios.get(MINING_URL);
    console.log(response);
    if (response.status === 200) 
    {
        $('#extraction tbody').empty();
        //tableau d'éléments
        const minedElement = response.data;
        minedElement.forEach(e => {
            let elementHtml = '<tr>';

            elementHtml += `<td> <img class="element" src="${ELEMENT_IMG_URL}/${e.element}.png"/>${e.element} </td>`
            elementHtml += `<td>${e.quantity}</td>`

            elementHtml += '</tr>'

            $('#extraction tbody').append(elementHtml);
        })
        console.log(minedElement);

    }
    else
    {
        //message d'erreur sur console
        console.log(response);
    }
}

async function addPortal(){
    const isPortalValid=document.getElementById('txtPosition').checkValidity();
   

    if (isPortalValid) 
    {
         const position =$('#txtPosition').val();
    const affinity =$('#cboAffinity').val();
    
    //Url qui permet de créer le portail
    const CREATE_PORTAL_URL = `${urlParams.planet}/portals`;

    const body ={
        position: position,
        affinity: affinity
    }

    const response = await axios.post(CREATE_PORTAL_URL, body)
    if (response.status === 201)
    {
        const newPortal = response.data;
        const portalHtml = displayAPortal(newPortal);

        $('#portals tbody').append(portalHtml)
    }
    else
    {
        console.log(response);

    }
    
    }
   else
    {
        console.log("Portal dans un format invalide");
    }
    
}

async function getPlanet(url)
{
    const response = await axios.get(url)
    if (response.status === 200) {
        const planet = response.data;
        console.log(planet);
       //TODO: IMG
       $("#imgIcon").attr('src', planet.icon);
       //TODO: NAME
       $('#lblName').html(planet.name);
       //TODO: Decouvert par
       $('#lblDiscoveredBy').html(planet.discoveredBy);
       $('#lblDiscoveryDate').html(planet.discoveryDate);
       $('#lblTemperature').html(planet.temperature);
       const position = `(${planet.position.x.toFixed(3)}; ${planet.position.y.toFixed(3)}; ${planet.position.z.toFixed(3)}); `
       $('#lblPosition').html(position);
       
        
       let satellitesHtml ='';
       planet.satellites.forEach(s => {
            satellitesHtml+= `<li>${s}</li>`;

       });
       if (satellitesHtml === '')
        {
            satellitesHtml += 'Aucun Satellite'

      

       }
      
       

       $('#Satellites').html(satellitesHtml);
       displayPortal(planet.portals)

}

}

function displayPortal(portals)
{
    //1.Boucle ForEach

        //2.Pour chaque portal un tr(ranger)

        //3. dans chaque tr ==> 2 td un pour position et 1 pour affinitées
    //4. Ajouter la chaine dans la page
    let portalsHtml = "";
    portals.forEach(p =>{ //1.

        portalsHtml+= '<tr>' //2.

            portalsHtml+=`<td class="PageT">${p.position}</td>`
            portalsHtml+=`<td><img src="img/${p.affinity}.png" title=${p.affinity}/></td>`

        portalsHtml+= '</tr>'
    })
    $('#portals tbody').html(portalsHtml);

}

function displayAPortal(p)
{
    let portalsHtml = '';
    portalsHtml+= '<tr>' //2.

    portalsHtml+=`<td class="PageT">${p.position}</td>`
    portalsHtml+=`<td><img src="img/${p.affinity}.png" title=${p.affinity}/></td>`

    portalsHtml+= '</tr>'
    return portalsHtml
}