var praiasLista = [];


window.onload = async function () {
  try {
    let events = await $.ajax({
      url: '/api/events',
      method: 'get',
      dataType: 'json'
    });
    createEventsHTML(events);
    let praias = await $.ajax({
      url: '/api/praias',
      method: 'get',
      dataType: 'json'
    });

    let html = "<option value=''></option>";
    for (let praia of praias) {
      let exist = false;
      for (let i = 0; i < praiasLista.length; i++) {
        if (praiasLista[i] == praia.praia_local) {
          exist = true;
          break;
        }
        else {
          exist = false;
          continue;
        }
      }
      if (exist == false) {
        praiasLista.push(praia.praia_local)
        html += `<option value='${praia.praia_local}'>
                          ${praia.praia_local}
                  </option>`
      }
      else {
        continue;
      }
      
    }

    document.getElementById("local").innerHTML = html;

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


async function filter() {
  try {
    let estado = document.getElementById("estado").value;
    let local = document.getElementById("local").value;
    let events = await $.ajax({
      url: `/api/events/lista/filter/?estado=${estado}&local=${local}`,
      method: 'get',
      dataType: 'json'
    });
    createEventsHTML(events);
  } catch (err) {
    console.log(err);
  }

}


function showEvent(id) {
  sessionStorage.setItem("eventId", id);
  window.location = "event.html";
}