$('.slide-principal').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 2000
});



function checkColabView(){
  if (sessionStorage.getItem("colaboradorId")) {
    document.getElementById('Colaborator Events').style="display: block";
  }
}

function checkUserView(){
  if (sessionStorage.getItem("utiId")) {
    document.getElementById('User Historico').style="display: block";
  }
}


window.onload = function () {
    checkColabView();
    checkUserView();
  }
