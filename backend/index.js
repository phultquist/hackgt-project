import express from 'express';
import request from 'request-promise';
import moment from 'moment-timezone'
import getAccessKey from './auth.js';

const app = express();

//getting locations of all products in catalog
const dateString = () => {
    return moment().tz("GMT").format("ddd, D MMM YYYY HH:mm:ss z");
}

app.get("/locations", async (req, res) => {
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

    try {
        var result = await request(options);

        const sitesBasic = JSON.parse(result).pageContent;
        var sites = await Promise.all(
            sitesBasic.map(async site => {
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

                var siteInfo = await request(options);
                return JSON.parse(siteInfo);
            })
        );
        res.status(200).json(sites);
    } catch (e) {
        res.status(500).send("error")
        throw new Error(e);
    }
});

app.get("/catalog", async (req, res) => {
    const path = '/catalog/items/';

    var options = {
        'method': 'GET',
        'url': 'https://api.ncr.com' + path,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': getAccessKey(path, 'GET'),
            'nep-organization': 'test-drive-890477f1b75e491b910d3',
            'Date': dateString()
        },
    };

    try {
        const result = JSON.parse(await request(options)).pageContent;
        const catalog = result.map(item => {
            return {
                name: item.shortDescription.value,
                slug: item.itemId.itemCode
            }
        })

        res.status(200).send(catalog)
    } catch (e) {
        res.status(500).send("error")
        throw new Error(e);
    }

});

//submits problem
app.post("/problem", (req, res) => {
    const { body } = req;
    //submits problem to NCR API
    const { storeId, productId, description, email } = body;
    const time = new Date();

    const path = '/'

    var options = {
        'method': 'GET',
        'url': 'https://api.ncr.com' + path,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': getAccessKey(path, 'GET'),
            'nep-organization': 'test-drive-890477f1b75e491b910d3',
            'Date': dateString()
        },
    };

    res.status(200).send("success");
});

app.get("/history", async (req, res) => {
    const { body } = req;
    let historyList = [{
        problem: "problems with product",
        locationId: "1234567",
        catalogId: "1234567",
        itemId: "1234567",
        description: "1234567"
    }]

    const path = '/items'
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
    const result = await request(options)
    //submits history of problem to NCR API

    //submit request to NCR API

    res.status(200).json(historyList);
})

app.listen(5000)