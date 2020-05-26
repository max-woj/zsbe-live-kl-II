const fs = require('fs');
class TemperatureModel {
    saveTemperatures(tempsToSave){
        console.warn('deprecated');
        const tempsFromFile = this.getTemperatures();
        const mergedArray = tempsFromFile.concat(tempsToSave);
        fs.writeFileSync(`${__dirname}/temperatures.json`, JSON.stringify(mergedArray));
    }

    getTemperatures(){
        let fileData;
        try{
            fileData = JSON.parse(fs.readFileSync(`${__dirname}/temperatures.json`).toString())
        } catch {
            fileData = [];
        }

        return fileData;
    }
}

module.exports = TemperatureModel;
