var datasetNumberOfUsers = [];
var genders = [];
var listaIdades = [];
var listaAdultoJovem = [];
var listaAdulto = [];
var listaAdultoSenior = [];
var generosMediaPontos = [];
var dict = {};
var dictSoma = {};
var dictAvg = {};

window.onload = async function () {

    try {
        let users = await $.ajax({
            url: "/api/users/genero/number",
            method: "get",
            dataType: "json"

        });

        let idades = await $.ajax({
            url: "/api/users/",
            method: "get",
            dataType: "json"
        });

        let medias = await $.ajax({
            url: "/api/users/genero/mediaPontos",
            method: "get",
            dataType: "json"
        });

        let eventLixoSoma = await $.ajax({
            url: "/api/events/info/somaLixo",
            method: "get",
            dataType: "json"
        });

        let eventLixoAvg = await $.ajax({
            url: "/api/events/info/mediaLixo",
            method: "get",
            dataType: "json"
        });

        for (let evento of eventLixoAvg){
            if (evento.media > 0) {
                dictAvg[evento.praia_nome] = evento.media;
            }
        }

        for (let event of eventLixoSoma){
            if (event.soma > 0) {
                dictSoma[event.praia_nome] = event.soma;
            }
        }

        console.log(dictSoma);

        for (let media of medias){
            generosMediaPontos.push(media.media)
        }

        for (let idade of idades){
            listaIdades.push(idade.uti_idade);
        }

        for (let idade of listaIdades){
            if (idade > 18 && idade < 27){
                listaAdultoJovem.push(idade);
            }
            else if (idade >= 28 && idade <= 54){
                listaAdulto.push(idade);
            }
            else if (idade > 55){
                listaAdultoSenior.push(idade);
            }
        }


        console.log(listaAdultoJovem.length)

        for (let user of users) {
            datasetNumberOfUsers.push(user.num);
            genders.push(user.uti_genero);
        }

        genders.sort();
        
    } catch (err) {
        console.log(err);
    }

    datasetNumberOfUsers.sort();
    datasetNumberOfUsers.push(0);

    // criar gr??fico de barras
    let chart = new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: genders,
            datasets: [
                {
                    label: "N?? Utilizadores",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: datasetNumberOfUsers
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            title: {
                display: true,
                text: 'EcoBe - An??lise de Dados'
            },
        }
    });
    let barChartHeight = document.getElementById("bar-chart").clientHeight;
    console.log(barChartHeight)
    chart.chart.height = barChartHeight;
    console.log(chart);

    // criar gr??fico pie

    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: ["Adulto Jovem", "Adulto", "Adulto S??nior"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [listaAdultoJovem.length, listaAdulto.length, listaAdultoSenior.length]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Percentagem da presen??a de diferentes faixas et??rias - EcoBe'
            }
        }
    });

    //cria????o gr??fico doughnut
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: genders,
            datasets: [
                {
                    label: "M??dia de total de pontos",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: generosMediaPontos
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'M??dia de total de pontos de cada g??nero no EcoBe'
            }
        }
    });
    Chart.defaults.global.responsive = true;


    for (let valor of listaIdades){
        dict[valor] = getOccurrence(listaIdades, valor);
    }

    console.log(Object.values(dict));
    let lista1 = Object.keys(dict);
    let lista2 = Object.values(dict)
    lista2.push(0);

    // cria????o de um gr??fico de barras horizontal
    new Chart(document.getElementById("horizontal-chart"), {
        type: 'horizontalBar',
        data: {
            labels: lista1,
            datasets: [
                {
                    label: "Idades",
                    backgroundColor: ["#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd"],
                    data: lista2
                }
            ]
        },
        options: {
            scaleShowLabels : false,
            scales: {
                yAxes: [{
                    display: false,  // remover o texto das labels para uma melhor visualiza????o do gr??fico
                }]
            },
            title: {
                display: true,
                text: 'Estat??stica quantitativa dos g??neros - EcoBe'
            }
        }
    });

    let lista3 = Object.keys(dictSoma);
    let lista4 = Object.values(dictSoma)

    new Chart(document.getElementById("pie-chart2"), {
        type: 'pie',
        data: {
            labels: lista3,
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: lista4
            }]
        },
        options: {
            title: {
                display: true,
                text: 'M??dia de lixo apanhado (kilogramas) em cada praia - EcoBe'
            }
        }
    });

    console.log(dictAvg)
    let lista5 = Object.keys(dictAvg);
    let lista6 = Object.values(dictAvg)
    lista6.push(6);
    new Chart(document.getElementById("radar-chart"), {
        type: 'radar',
        data: {
            labels: lista5,
            datasets: [{
                label: "Pontos",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: lista6
            }]
        },
        options: {
            title: {
                display: true,
                text: 'M??dia de pontos/utilizador por praia - EcoBe'
            }
        }
    });

}

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}