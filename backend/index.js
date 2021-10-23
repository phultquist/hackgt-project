import express from 'express';
import request from 'request-promise';
import moment from 'moment-timezone'
import getAccessKey from './auth.js';

const app = express();

//getting locations of all products in catalog
const dateString = () => {
    return moment().tz("GMT").format("ddd, D MMM YYYY HH:mm:ss z");
}

app.get("/locations", (req, res) => {

    const path = '/site/sites/find-by-criteria';

    var options = {
        'method': 'POST',
        'url': 'https://api.ncr.com' + path,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': getAccessKey(path, 'POST'),
            'nep-organization': 'test-drive-890477f1b75e491b910d3',
            'Date': dateString()
        },
        body: JSON.stringify({
            "criteria": {
                "status": "ACTIVE"
            }
        })
    };

    request(options, async function (error, response) {
        if (error) throw new Error(error);
        const sites = JSON.parse(response.body).pageContent;
        // get info about each site
        await sites.map(async site => {
            const siteId = site.id;
            const path = '/site/sites/' + siteId;
            var options = {
                'method': 'GET',
                'url': 'https://api.ncr.com' + path,
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': getAccessKey(path, 'GET'),
                    'nep-organization': 'test-drive-890477f1b75e491b910d3',
                    'Date': dateString()
                },
            }


        })
        res.status(200).json(sites);
    });

    //returning locationId and catalogId
})

//submits proble
app.post("/problem", (req, res) => {
    const { body } = req;
    let problem = {
        email: "something@example.com",
        locationId: "1234567",
        itemId: "123456",
        description: "236546"
    }
    //submits problem to NCR API

    //submit request to NCR APi

    res.status(200).send("success");
});

app.post("/history", (req, res) => {
    const { body } = req;
    let historyList = [{
        problem: "problems with product",
        locationId: "1234567",
        catalogId: "1234567",
        itemId: "1234567",
        description: "1234567"
    }]
    //submits history of problem to NCR API

    //submit request to NCR API

    res.status(200).json(historyList);
})

app.listen(5000)