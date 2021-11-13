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
    document.getElementById('Colaborator Events').style.visibility = 'visible';
  }
  else {
    document.getElementById('Colaborator Events').style.visibility = 'hidden';
  }
}

window.onload = function () {
  checkColabView();
}
