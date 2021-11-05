var nome;

async function getPerfil() {
        try {
        nome = document.getElementById("result").innerHTML;
        console.log(nome);
        let user = await $.ajax({
            url: "/api/users/perfil/"+nome,
            method: "get",
            dataType: "json"
        });
        console.log(user.uti_username)
        document.getElementById("nomeP").innerHTML= "Bem-vindo "  + user.uti_nomeP + " " +  user.uti_nomeU;
        document.getElementById("pontos").innerHTML= "Você tem um total de " + user.uti_pontosTotal + " pontos acumulados";
        document.getElementById("mail").innerHTML= "Seu mail: "  + user.uti_mail;
        document.getElementById("rank").innerHTML= "Rank atual: "  + user.uti_rank;
        document.getElementById("eventos").innerHTML= "Você participou em "  + user.uti_eventosTotal  + " eventos";
        } catch(err) {
            console.log(err);
        }
}

function getUsername(){
    let input = document.getElementById("username");
    let username = input.value;
    document.getElementById("result").innerHTML = username;
}
