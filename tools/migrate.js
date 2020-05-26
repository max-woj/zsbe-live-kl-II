const DAY_IN_MILIS = 1000*60*60*24;
const fs = require('fs');
const filePath = `${__dirname}/../model/temperatures.json`;

fs.readFile(filePath, (err, file) => {
    const temperaturesArray = JSON.parse(file.toString());
    const temperatureDates = Array.from(temperaturesArray.keys()).map(x => {
        return new Date(Date.now() - (temperaturesArray.length - x) * DAY_IN_MILIS);
    });
    const arrayToSave = temperatureDates.map((tempDate, idx) => {
        return {
            date: tempDate,
            value: temperaturesArray[idx],
            index: idx
        }
    });
    fs.writeFileSync(filePath, JSON.stringify(arrayToSave));
});

