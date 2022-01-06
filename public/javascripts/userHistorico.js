var praiasLista = [];
var utiId = sessionStorage.getItem("utiId")

window.onload = async function () {

  try {
      
    let histo = await $.ajax({
      url: '/api/users/historico/' + utiId,
      method: 'get',
      dataType: 'json'
    });
    
    let html = "";
    let iteracaoFim = false; 
    
    for(let event of histo){
      if (iteracaoFim == true){
        break;
      } else {
        html +=`<h4>${event.uti_nomeP}, seu Histórico de Eventos</h4>
        `;
        iteracaoFim = true;
      }
    }
    
    document.getElementById("txthist").innerHTML = html;

    createEventsHTML(histo);
    let praias = await $.ajax({
      url: '/api/praias',
      method: 'get',
      dataType: 'json'
    });

  } catch (err) {
    console.log(err);
  }
}


function createEventsHTML(events) {
  let html = "";
  for (let event of events) {
    html += `<section onclick="showEvent(${event.eve_id})">
      <h5>Recolha de lixo em:</h5><p> <h2>${event.praia_local}</h2>
      <p>${event.eve_estado}</p>
    </section>`
  }
  document.getElementById("events").innerHTML = html;
}



function showEvent(id) {
  sessionStorage.setItem("eventId", id);
  window.location = "event.html";
}