const express = require('express');
const bodyParser = require('body-parser');
const TemperatureModel = require('./model/TemperatureModel');
const EventEmitter = require('events');
const temperaturesEmitter = new EventEmitter();
temperaturesEmitter.setMaxListeners(2);

const app = express();
app.use(express.static('public'));
app.use(bodyParser())

app.get('/temperatures', (req, res) => {
    const temperatureModel = new TemperatureModel();
    const temps = temperatureModel.getTemperatures();

    res.status(200).send(temps);
});


app.delete('/temperatures', (req, res) => {
    const temperatureModel = new TemperatureModel();
    const temps = temperatureModel.getTemperatures();


    res.status(200).send(temps);
});


app.post('/temperatures', (req, res) => {
    const parseParams = (query) => {
        return query.split(',').map(val => Number(val));
    }

    const stringParam = req.body.temperatures
    const temps = parseParams(stringParam);
    const temperatureModel = new TemperatureModel(temperaturesEmitter);

    temperatureModel.saveTemperatures(temps);

    res.status(301).redirect('/')
});

const httpServer = app.listen(3000);

const io = require('socket.io')(httpServer);

temperaturesEmitter.on('temperatures-saved', (arg) => {
    io.emit('temperatures-updated', arg);
});



