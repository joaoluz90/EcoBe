window.onload = async function () {

  checkColabView();
  checkUserView();

  try {
    let colaboradores = await $.ajax({
      url: "/api/colaboradores",
      method: "get",
      dataType: "json"
    });
    let html = "";


    for (let colab of colaboradores) {
      html += `<section (${colab.cola_id})">
            <h3>${colab.cola_nome}</h3>
          </section>`
    }
    document.getElementById("units").innerHTML = html;
  } catch (err) {
    console.log(err);
  }
}

function checkColabView() {
  if (sessionStorage.getItem("colaboradorId")) {
    document.getElementById('Colaborator Events').style = "display: block";
  }
}

function checkUserView() {
  if (sessionStorage.getItem("utiId")) {
    document.getElementById('User Historico').style = "display: block";
  }
}