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

app.get('/weather/:plz', async (req, res) => {
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${req.params.plz}00`
    try {
        const data = await getData(url);
        res.send(data.currentWeather.temperature.toString());
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
