var praiasLista = [];
var colabId = sessionStorage.getItem("colaboradorId")

window.onload = async function () {
  try {
    let events = await $.ajax({
      url: '/api/colaboradores/' + colabId + '/events',
      method: 'get',
      dataType: 'json'
    });
    createStudentsHTML(events);
    let praias = await $.ajax({
      url: '/api/praias',
      method: 'get',
      dataType: 'json'
    });

  } catch (err) {
    console.log(err);
  }
}


function createStudentsHTML(events) {
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
  window.location = "colaboradorEvent.html";
}