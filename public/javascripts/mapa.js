var distancia;
var lat;
var lon;
var markerVerde;
var mymap;
var menorDistancia;
var coordsEventoMenosDistante;
var latMenor;
var lonMenor;
var praiaMenosDistante;
var eventosFinalizados;
var eventosIniciados;
var eventosNaoIniciados;
var praiaMaisProx;

async function getGeoLocalAndData() {
    if ('geolocation' in navigator) {
        console.log('geolocation disponível')
        navigator.geolocation.getCurrentPosition(position => {  //obter posição do utilizador
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log("posição cliente " + position);
            var greenIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [30, 45],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            var mark = L.marker([lat, lon], { icon: greenIcon }).addTo(mymap)
                .bindPopup("Você está aqui!").openPopup();
            var pop = L.popup()
            getData();
            // aqui 
        });
    } else {
        console.log('geolocation indisponível')  // posição do user indispovível
    }

}


async function routing() {
    console.log("praias lista: " + praiaMenosDistante);
    latMenor = coordsEventoMenosDistante[coordsEventoMenosDistante.length - 2];
    lonMenor = coordsEventoMenosDistante[coordsEventoMenosDistante.length - 1];
    console.log(latMenor, lonMenor);
    L.Routing.control({
        waypoints: [
            L.latLng(lat, lon),
            L.latLng(latMenor, lonMenor)
        ]
    }).addTo(mymap);
    praiaMaisProx = praiaMenosDistante[praiaMenosDistante.length - 1];
    document.getElementById("praiaProx").innerHTML = praiaMaisProx;  
    alert("Praia mais próxima de si:  " + praiaMenosDistante[praiaMenosDistante.length - 1]);}


async function getData() {
    data = await $.ajax({
        url: "/api/events",
        method: "get",
        dataType: "json"
    });
    coordsEventoMenosDistante = [];   //array com as corrdenadas do evento mais próximo do user
    var menorDistancia = 100000000000;    // variável auxiliar para obter o evento mais próximo
    praiaMenosDistante = [];    // array que contém nome da praia mais próxima

    // variáveis com os icons dos markers de diferentes cores para identificação e diferenciação do estado(tipo) dos eventos
    var markerAzul = L.AwesomeMarkers.icon({
        markerColor: 'blue',
        prefix: 'fa',
        extraClasses: 'fas',
        icon: 'group'
    });

    var markerVerde = L.AwesomeMarkers.icon({
        markerColor: 'green',
        prefix: 'fa',
        extraClasses: 'fas',
        icon: 'group'
    });

    var markerVermelho = L.AwesomeMarkers.icon({
        markerColor: 'red',
        prefix: 'fa',
        extraClasses: 'fas',
        icon: 'group'
    });


    for (let item of data) {
        if (item.eve_estado == "Finalizado") {
            const marker = L.marker([item.praia_latitude, item.praia_longitude], { icon: markerVermelho }).addTo(mymap)
                .bindPopup("Praia: " + item.praia_nome + "<p>" + "Lotação: " + item.eve_lotacao + "<p>" + "Colaborador: " + item.cola_nome + "<p>" + "Categoria: " + item.eve_categoria + "<p>" + "<h4>Estado: " + item.eve_estado).openPopup();
            var popup = L.popup()
            marker.addTo(eventosFinalizados);
            distancia = L.GeometryUtil.distance(mymap, L.latLng(lat, lon), L.latLng(item.praia_latitude, item.praia_longitude));
            console.log(distancia);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                coordsEventoMenosDistante.push(item.praia_latitude);
                coordsEventoMenosDistante.push(item.praia_longitude);
                praiaMenosDistante.push(item.praia_nome);
            }
        }

        else if (item.eve_estado == "Iniciado") {
            const marker = L.marker([item.praia_latitude, item.praia_longitude], { icon: markerAzul }).addTo(mymap)
                .bindPopup("Praia: " + item.praia_nome + "<p>" + "Lotação: " + item.eve_lotacao + "<p>" + "Colaborador: " + item.cola_nome + "<p>" + "Categoria: " + item.eve_categoria + "<p>" + "<h4>Estado: " + item.eve_estado).openPopup();
            var popup = L.popup()
            marker.addTo(eventosIniciados);
            distancia = L.GeometryUtil.distance(mymap, L.latLng(lat, lon), L.latLng(item.praia_latitude, item.praia_longitude));
            console.log(distancia);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                coordsEventoMenosDistante.push(item.praia_latitude);
                coordsEventoMenosDistante.push(item.praia_longitude);
                praiaMenosDistante.push(item.praia_nome)
            }
        }

        else if (item.eve_estado == "Não iniciado") {
            const marker = L.marker([item.praia_latitude, item.praia_longitude], { icon: markerVerde }).addTo(mymap)
                .bindPopup("Praia: " + item.praia_nome + "<p>" + "Lotação: " + item.eve_lotacao + "<p>" + "Colaborador: " + item.cola_nome + "<p>" + "Categoria: " + item.eve_categoria + "<p>" + "<h4>Estado: " + item.eve_estado).openPopup();
            var popup = L.popup()
            marker.addTo(eventosNaoIniciados);
            distancia = L.GeometryUtil.distance(mymap, L.latLng(lat, lon), L.latLng(item.praia_latitude, item.praia_longitude));
            console.log(distancia);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                coordsEventoMenosDistante.push(item.praia_latitude);
                coordsEventoMenosDistante.push(item.praia_longitude);
                praiaMenosDistante.push(item.praia_nome)
            }
        }
    }


    // botões de filtragem (easyButton)
    var b1 = L.easyButton({
        id: 'eventosFinalizados',
        states: [{
            stateName: 'add-markers',
            icon: 'fa-map-marker',
            title: 'Esconda eventos finalizados',
            onClick: function (control) {
                mymap.addLayer(eventosFinalizados);
                control.state('remove-markers');
            }
        }, {
            icon: 'fa-undo',
            stateName: 'remove-markers',
            onClick: function (control) {
                mymap.removeLayer(eventosFinalizados);
                control.state('add-markers');
            },
            title: 'Mostrar eventos finalizados'
        }]
    });
    b1.addTo(mymap);

    var b2 = L.easyButton({
        id: "eventosIniciados",
        states: [{
            stateName: 'add-markers',
            icon: 'fa-map-marker',
            title: 'Esconder eventos iniciados',
            onClick: function (control) {
                mymap.addLayer(eventosIniciados);
                control.state('remove-markers');
            }
        }, {
            icon: 'fa-undo',
            stateName: 'remove-markers',
            onClick: function (control) {
                mymap.removeLayer(eventosIniciados);
                control.state('add-markers');
            },
            title: 'Mostrar eventos iniciados'
        }]
    });
    b2.addTo(mymap);

    var b3 = L.easyButton({
        id: "eventosNaoIniciados",
        states: [{
            stateName: 'add-markers',
            icon: 'fa-map-marker',
            title: 'Mostrar eventos não iniciados',
            onClick: function (control) {
                mymap.addLayer(eventosNaoIniciados);
                control.state('remove-markers');
            }
        }, {
            icon: 'fa-undo',
            stateName: 'remove-markers',
            onClick: function (control) {
                mymap.removeLayer(eventosNaoIniciados);
                control.state('add-markers');
            },
            title: 'Esconder eventos não iniciados'
        }]
    });
    b3.addTo(mymap);
    routing();
}


window.onload = async function () {

    mymap = L.map('mapid').setView([38.736946, -9.142685], 9);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    // criação das layers para cada estado estado dos eventos

    eventosFinalizados = L.layerGroup([]);
    eventosIniciados = L.layerGroup([]);
    eventosNaoIniciados = L.layerGroup([]);

    getGeoLocalAndData();
}