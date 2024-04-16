const request = require('request');
const express = require('express');
const app = express();
const port = 3000;

function getData(url) {
    return new Promise((resolve, reject) => {
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== 200) {
                reject(new Error(`Status: ${res.statusCode}`));
            } else {
                resolve(data);
            }
        });
    });
}

async function getTemperature(zip) {
    const response = await fetch(`https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`)
    const json = await response.json()
    console.log(json)
    return json

}

app.get('/weather', async (req, res) => {
    const data = await getTemperature(req.query.plz)

    res.send(data.currentWeather.temperature.toString());



});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
