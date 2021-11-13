var eventId;
var userId;
var utiId;
var estado;
var dataInicio;
var lixo;
var teste;

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
              ${user.uti_nomeU} - ${user.uti_username}</h4>
            `
        }
        document.getElementById("participantes").innerHTML = html;

        let html2 = "<option value=''></option>";
        for (let user of users) {
            html2 += `<option value='${user.uti_username}'>
                          ${user.uti_username}
                  </option>`
        }
        document.getElementById("username").innerHTML = html2;

    } catch (err) {
        console.log(err);
    }
}


async function pesar() {
    try {
        let user = await $.ajax({
            url: "/api/users/perfil/" + document.getElementById("username").value,
            method: "get",
            dataType: "json"
        })

        let id = user.uti_id;

        let obj = {
            lixo: document.getElementById("peso").value,
            uti: id,
            event: sessionStorage.getItem("eventId")
        }
        let participa = await $.ajax({
            url: `/api/colaboradores/pesa`,
            method: 'put',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
    } catch (err) {
        console.log(err);
    }
}


function showInfo() {
    document.getElementById("msg").innerHTML = "Pesagem efetuada com sucesso! ";
}


function atualizarPag() {
    reload = location.reload();
}