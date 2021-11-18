async function login() {
    try {
        let obj = {
            username: document.getElementById("username").value,
            pass: document.getElementById("pass").value
        }
        let staff = await $.ajax({
            url: '/api/staff/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        sessionStorage.setItem("staffId", staff.staff_id);
        window.location = "staffDashboard.html";
        alert("Login efetuado com sucesso")
    } catch (err) {
        document.getElementById("msg").innerText = err.responseJSON.msg;
    }
} 