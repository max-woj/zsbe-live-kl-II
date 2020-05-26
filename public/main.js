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
fetchTemperatures();
const socket = io.connect();
socket.on('temperatures-updated', createPlot);

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
