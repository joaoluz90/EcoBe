var eveId;

function checkColabView(){
  if (sessionStorage.getItem("colaboradorId")) {
    document.getElementById('Colaborator Events').style="display: block";
  }
}

function checkUserView(){
  if (sessionStorage.getItem("utiId")) {
    document.getElementById('User Historico').style="display: block";
  }
}


window.onload = async function () {
    checkColabView();
    checkUserView();
    try{
        let onFireEvent = await $.ajax({
            url: "/api/events/entries/onFireEvent",
            method: "get",
            dataType: "json"

        });
        console.log(onFireEvent)
        eveId = onFireEvent.ofe_eve_id;
        console.log(onFireEvent.ofe_eve_id)
        let event = await $.ajax({
          url: "/api/events/" + eveId,
          method: "get",
          dataType: "json"
      });

      let lotacao = await $.ajax({
        url: "/api/events/lotacao/" + eveId,
        method: "get",
        dataType: "json"
      });

      lotacao = lotacao['COUNT(*)'];

      dataInicio = new Date(event.eve_datainicio);

      document.getElementById("teste").innerHTML = event.praia_local + "<br> Horário: " + dataInicio + "<br> Categoria: " + event.eve_categoria + "<br> Pessoas inscritas: " + lotacao;

      } catch(err) {
        console.log(err)
      }
    
  }
