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
})

});
function addPortal(){
    const position =$('#txtPosition').val();
    const affinity =$('#cboAffinity').val();
    console.log(position);
    console.log(affinity);
}

async function getPlanet(url)
{
    const response = await axios.get(url)
    if (response.status === 200) {
        const planet = response.data;
        console.log(planet);
       //TODO: IMG
       $("#imgIcon").attr('src', planet.icon)
       //TODO: NAME
       $('#lblName').html(planet.name)
       //TODO: Decouvert par
       $('#lblDiscoveredBy').html(planet.discoveredBy)
       $('#lblDiscoveryDate').html(planet.discoveryDate)
       $('#lblTemperature').html(planet.temperature)
       $('#lblPosition').html(`${planet.position.x.toFixed(3)}`)
       $('#lblPosition').html(`${planet.position.y.toFixed(3)}`)
       $('#lblPosition').html(`${planet.position.z.toFixed(3)}`)
        
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