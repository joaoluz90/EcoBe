async function login() {
    try {
        let obj = {
            username: document.getElementById("username").value,
            pass: document.getElementById("pass").value
        }
        let colab = await $.ajax({
            url: '/api/colaboradores/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        sessionStorage.setItem("colaboradorId", colab.cola_id);
        window.location = "colaboratorEvents.html";
        alert("Login efetuado com sucesso")
    } catch (err) {
        document.getElementById("msg").innerText = err.responseJSON.msg;
    }
}   