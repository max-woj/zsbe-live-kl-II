const fs = require('fs');

class TemperatureModel {

    constructor(eventEmmiter) {
        this.eventEmitter = eventEmmiter;
    }

    saveTemperatures(tempsToSave){
        console.warn('deprecated');
        const tempsFromFile = this.getTemperatures();
        const mergedArray = tempsFromFile.concat(tempsToSave);
        fs.writeFileSync(`${__dirname}/temperatures.json`, JSON.stringify(mergedArray));
        this.eventEmitter.emit('temperatures-saved', mergedArray);
    }

    getTemperatures(){
        let fileData;
        try{
            fileData = JSON.parse(fs.readFileSync(`${__dirname}/temperatures.json`).toString());
        } catch {
            fileData = [];
        }

        return fileData;
    }
}

module.exports = TemperatureModel;
