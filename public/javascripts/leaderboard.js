window.onload = async function() {
    try {
        let users = await $.ajax({
          url: "/api/users/leaderboard",
          method: "get",
          dataType: "json"
        });

        let html = "";
        let html2 = "";
        let html3 = "";
        let number = 0;
         for (let user of users) {
          number += 1;
          html+=`${user.username} <p>`
          html2+=`${user.Pontos} <p>`
          html3+=`${number}º<p>`

        }
        console.log(html)
        document.getElementById("username").innerHTML = html;
        document.getElementById("pontos").innerHTML = html2;
        document.getElementById("number").innerHTML = html3;

      } catch (err) {
        console.log(err);
      }

}
  