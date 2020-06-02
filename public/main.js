const createPlot = (temperaturesArray) => {
    const trace1 = {
        x: temperaturesArray.keys(),
        y: temperaturesArray,
        type: 'scatter'
    };
    const data = [trace1];
    Plotly.newPlot('mainChart', data);
}

const fetchTemperatures = () => {
    fetch('/temperatures')
        .then((response) => response.json())
        .then((temperaturesArray) => {
            createPlot(temperaturesArray)
        });
}

const saveTemperature = (temperatures) => {
    fetch('/temperatures', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({temperatures: temperatures})
    })
        .then((response) => {
            console.log('udało się zapisać');
        })
        .catch(() => {
            console.log('nie udało się zapisać');
        })
}

fetchTemperatures();
const socket = io.connect();
socket.on('temperatures-updated', createPlot);

const temperatureInput = document.getElementById('temperature-value');
const submitButton = document.getElementById('temperatures-submit');

submitButton.addEventListener('click', event => {
    saveTemperature(temperatureInput.value);
});


/*
fetch('/temperatures')
    .then((response) => response.json())
    .then((temperaturesArray) => {
        const trace1 = {
            x: temperaturesArray.map(x => x.date),
            y: temperaturesArray.map(x => x.value),
            type: 'scatter'
        };
        const data = [trace1];
        Plotly.newPlot('mainChart', data);
    });
*/
