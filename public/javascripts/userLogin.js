async function login() {
    try {
        let obj = {
            username: document.getElementById("username").value,
            pass: document.getElementById("pass").value
        }
        let user = await $.ajax({
            url: '/api/users/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        sessionStorage.setItem("utiId",user.uti_id);
        window.location = "events.html";
    } catch (err) {
        document.getElementById("msg").innerText = err.responseJSON.msg;
    }
}