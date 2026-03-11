let currentIndex = 0;
let dataset = [];
let chartInstance = null;

fetch("/data")
    .then(response => response.json())
    .then(data => {
        dataset = data;
        renderCard(currentIndex);
        renderChart();
    });

function renderCard(index) {
    const card = dataset[index];
    const front = document.getElementById("cardFront");
    const back = document.getElementById("cardBack");
    const cardElement = document.getElementById("card");

    cardElement.classList.remove("flip");

    front.innerHTML = `
        <img src="${card.Image}">
        <h2>${card.Name}</h2>
    `;

    back.innerHTML = `
        <h2>${card.Name}</h2>
        <p><strong>Era:</strong> ${card.Era}</p>
        <p><strong>Clothing Element:</strong> ${card.Clothing_Element}</p>
        <p><strong>Power Type:</strong> ${card.Power_Type}</p>
        <p><strong>Mechanism:</strong> ${card.Mechanism}</p>
        <p><strong>Power Score:</strong> ${card.PowerScore.toFixed(2)}</p>
    `;
}

function renderChart() {

    const ctx = document.getElementById("powerChart").getContext("2d");

    const names = dataset.map(d => d.Name);
    const scores = dataset.map(d => d.PowerScore);

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Power Score',
                data: scores
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById("card").addEventListener("click", function() {
    this.classList.toggle("flip");
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % dataset.length;
    renderCard(currentIndex);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + dataset.length) % dataset.length;
    renderCard(currentIndex);
});
