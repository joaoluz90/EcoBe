window.onload = async function() {
    try {
        let units = await $.ajax({
          url: "/api/colaboradores",
          method: "get",
          dataType: "json"
        });
        let html = "";

        
        for (let unit of units) {
          html+=`<section (${unit.cola_id})">
            <h3>${unit.cola_nome}</h3>
          </section>`
        }
        document.getElementById("units").innerHTML = html;
      } catch (err) {
        console.log(err);
      }


}
