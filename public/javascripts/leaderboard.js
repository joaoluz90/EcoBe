window.onload = async function() {
    try {
        let users = await $.ajax({
          url: "/api/users/leaderboard",
          method: "get",
          dataType: "json"
        });

        let html = "";
        let html2 = "";

         for (let user of users) {
          html+=`${user.username} <p>`
          html2+=`${user.Pontos} <p>`
        }
        console.log(html)
        document.getElementById("username").innerHTML = html;
        document.getElementById("pontos").innerHTML = html2;

      } catch (err) {
        console.log(err);
      }

}
  