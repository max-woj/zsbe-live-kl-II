const fs = require('fs');
const eventEmitter = require('events')
class TemperatureModel {
    saveTemperatures(tempsToSave){
        console.warn('deprecated');
        const tempsFromFile = JSON.parse(fs.readFileSync(`${__dirname}/temperatures.json`).toString());
        const mergedArray = tempsFromFile.concat(tempsToSave);
        fs.writeFileSync(`${__dirname}/temperatures.json`, JSON.stringify(mergedArray));
        eventEmitter.emit('database-updated');
    }

    getTemperatures(){
        return JSON.parse(fs.readFileSync(`${__dirname}/temperatures.json`).toString());
    }
}

module.exports = TemperatureModel;
