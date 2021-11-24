var eventId;
var userId;
var utiId;
var estado;
var dataInicio;
var lixo;


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

        lotacao = lotacao['COUNT(*)'];
        dataInicio = new Date(event.eve_datainicio);
        estado = event.eve_estado  // não apagar

        document.getElementById("title").innerHTML = "Local: " + event.praia_nome + ", " + event.praia_local;
        document.getElementById("categoria").innerHTML = "Categoria: " + event.eve_categoria;
        document.getElementById("colaborador").innerHTML = event.cola_nome;
        document.getElementById("lotacao").innerHTML = "Lotação: " + lotacao;
        document.getElementById("estado").innerHTML = "Estado: " + event.eve_estado;
        document.getElementById("datainicio").innerHTML = "Data de início: " + dataInicio;

        colabPermsView(estado, users);

    } catch (err) {
        console.log(err);
    }
}



async function pesar() {
    try {
        let utilizadorUsername = document.getElementById("username").value
        let pesoMsg = document.getElementById("peso").value
        sessionStorage.setItem("nomeUser", utilizadorUsername)
        sessionStorage.setItem("pesoUser", pesoMsg)
        let user = await $.ajax({
            url: "/api/users/perfil/" + document.getElementById("username").value,
            method: "get",
            dataType: "json"
        })

        const id = user.uti_id;
        const pontos = user.uti_pontosTotal;
        const peso = document.getElementById("peso").value;

        let obj = {
            lixo: document.getElementById("peso").value,
            uti: parseInt(id),
            event: sessionStorage.getItem("eventId")
        }

        updatePontos(peso, pontos, id);
        
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


async function updatePontos(lixo,pontos,uti) {
    
    try {

        let obj = {
            lixo: lixo,
            points: pontos,
            uti: uti
        }
        console.log(obj)
        let pontosUpdate = await $.ajax({
            url: `/api/colaboradores/updatePontos`,
            method: 'put',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
    } catch (err) {
        console.log(err);
    }

}


async function colabPermsView(estado, utilizadores) {

    if (estado == "Iniciado") {

        let html = "";

        for (let user of utilizadores) {
            let utiId = user.uti_id;
            let eveId = sessionStorage.getItem("eventId");
            let lixo = await $.ajax({
                url: `/api/colaboradores/user/lixo/?utiId=${utiId}&eveId=${eveId}`,
                method: 'get',
                dataType: 'json'
            });

            if (!lixo.par_lixo) {
                let lixo = 0;
                html += `<h4>${user.uti_nomeP}
                  ${user.uti_nomeU} - ${user.uti_username} - Lixo registado (gramas): ${lixo}</h4>
                `
            } else {
                html += `<h4>${user.uti_nomeP}
                    ${user.uti_nomeU} - ${user.uti_username} - Lixo registado (gramas): ${lixo.par_lixo} (REGISTO PESAGEM EFETUADA)</h4>
                  `
            }

        }

        let html2 = "<option value=''></option>";
        for (let user of utilizadores) {
            html2 += `<option value='${user.uti_username}'>
                                ${user.uti_username}
                        </option>`

        }
        document.getElementById("username").innerHTML = html2;
        document.getElementById("participantes").innerHTML = html;

    } else {   // EVENTOS DE OUTRAS CATEGORIAS DIFERENTES DE "Iniciado" - Prevenir pesagens em eventos não inciados ou finalizados

        let html = "";
        document.getElementById('inscricao').style.visibility = 'hidden';
        document.getElementById("texto").replaceWith("Não pode pesar um evento que não está a decorrer");
        peso.setAttribute("type", "hidden");
        username.style.display = 'none';

        for (let user of utilizadores) {
            html += `<h4>${user.uti_nomeP}
              ${user.uti_nomeU} - ${user.uti_username}</h4>
            `
        }
        document.getElementById("participantes").innerHTML = html;
    }
}


function showInfo() {
    document.getElementById("msg").innerHTML = "Pesagem efetuada com sucesso! Username: " + sessionStorage.getItem("nomeUser") + " / Peso registado: " + sessionStorage.getItem("pesoUser") + " / Evento nº"  + sessionStorage.getItem("eventId") ;
}


function atualizarPag() {
    reload = location.reload();
}

async function loadParticipantes() {
    let html = "";
    userId = sessionStorage.getItem("eventId");
        let users = await $.ajax({
            url: "/api/users/" + userId,
            method: "get",
            dataType: "json"

        });

        for (let user of users) {
            let utiId = user.uti_id;
            let eveId = sessionStorage.getItem("eventId");
            let lixo = await $.ajax({
                url: `/api/colaboradores/user/lixo/?utiId=${utiId}&eveId=${eveId}`,
                method: 'get',
                dataType: 'json'
            });

            if (!lixo.par_lixo) {
                let lixo = 0;
                html += `<h4>${user.uti_nomeP}
                  ${user.uti_nomeU} - ${user.uti_username} - Lixo registado (gramas): ${lixo}</h4>
                `
            } else {
                html += `<h4>${user.uti_nomeP}
                    ${user.uti_nomeU} - ${user.uti_username} - Lixo registado (gramas): ${lixo.par_lixo} (REGISTO PESAGEM EFETUADA)</h4>
                  `
            }

        }
        document.getElementById("participantes").innerHTML = html;
}