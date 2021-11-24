var eventId;
var userId;
var utiId;
var estado;
var participantes = [];
var dataInicio;

window.onload = async function () {
    try {
        userId = sessionStorage.getItem("eventId");
        let users = await $.ajax({
            url: "/api/users/" + userId,
            method: "get",
            dataType: "json"

        });
        eventId = sessionStorage.getItem("eventId");
        let event = await $.ajax({
            url: "/api/events/" + eventId,
            method: "get",
            dataType: "json"
        });
        let lotacao = await $.ajax({
            url: "/api/events/lotacao/" + eventId,
            method: "get",
            dataType: "json"
        });

        let html = "";
        lotacao = lotacao['COUNT(*)'];
        dataInicio = new Date(event.eve_datainicio);
        estado = event.eve_estado  // não apagar

        document.getElementById("title").innerHTML = "Local: " + event.praia_nome + ", " + event.praia_local;
        document.getElementById("categoria").innerHTML = "Categoria: " + event.eve_categoria;
        document.getElementById("colaborador").innerHTML = event.cola_nome;
        document.getElementById("lotacao").innerHTML = "Lotação: " + lotacao;
        document.getElementById("estado").innerHTML = "Estado: " + event.eve_estado;
        document.getElementById("datainicio").innerHTML = "Data de início: " + dataInicio;

        for (let user of users) {
            html += `<h4>${user.uti_nomeP}
              ${user.uti_nomeU}</h4>
            `
            participantes.push(user.uti_id);
        }
        document.getElementById("participantes").innerHTML = html;
        verifyLogin();
        verficarInscricao();
        console.log(participantes)
    } catch (err) {
        console.log(err);
    }
}

function verficarInscricao() {
    for(let i = 0; i < participantes.length; i++){
        if (participantes[i] == sessionStorage.getItem("utiId")) {
            document.getElementById('inscricao').style.visibility = 'hidden';
            document.getElementById("texto").innerHTML = "Já se inscreveu neste evento.";
        }
    }    
}


function verifyLogin() {

    if (sessionStorage.getItem("utiId" && estado == "Não iniciado")) {
        document.getElementById('inscricao').style.visibility = 'visible';
    }
    else if (estado != "Não iniciado" && (sessionStorage.getItem("utiId"))) {
        document.getElementById('inscricao').style.visibility = 'hidden';
        document.getElementById("texto").innerHTML = "Está autenticado. Não é possível se inscrever num evento já iniciado";
    }
    else if (estado != "Não iniciado") {
        document.getElementById('inscricao').style.visibility = 'hidden';
        document.getElementById("texto").innerHTML = "Não é possível se inscrever num evento já iniciado";
    }
    else if(!(sessionStorage.getItem("utiId")) && estado == "Não iniciado"){
        document.getElementById('inscricao').style.visibility = 'hidden';
        document.getElementById("texto").innerHTML = "Autenticação necessária para proceder à inscrição";
    }
}


async function enroll() {
    try {
        let obj = {
            eventId: parseInt(sessionStorage.getItem("eventId")),
            utiId: parseInt(sessionStorage.getItem("utiId")),
        }
        let participa = await $.ajax({
            url: `/api/users/${utiId}/participa`,
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        document.getElementById("enroll").innerHTML = "User enrolled with enrollment Id " + participa.par_id;
    } catch (err) {
        console.log(err);
    }
}

function atualizarPag() {
    reload = location.reload();
}