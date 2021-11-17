
window.onload =  function () {
    // criar gráfico de barras
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: ["Feminino", "Masculino"],
            datasets: [
                {
                    label: "Nº Utilizadores",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [11, 19, 0]
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'EcoBe - Análise de Dados'
            },
        }
    });

    // criar gráfico pie

    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: ["Adulto Jovem", "Adulto", "Adulto Sénior"],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [8, 3, 10]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Percentagem da presença de diferentes faixas etárias - EcoBe'
            }
        }
    });

    //criação gráfico doughnut
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: ["Masculino", "Feminino"],
            datasets: [
                {
                    label: "Média de total de pontos",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [39.6, 30.45]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Média de total de pontos de cada género no EcoBe'
            }
        }
    });
    Chart.defaults.global.responsive = true;
}