import express from 'express';
import request from 'request-promise';
import moment from 'moment-timezone'
import getAccessKey from './auth.js';

const app = express();

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "POST");
    next();
}

//getting locations of all products in catalog
const dateString = () => {
    return moment().tz("GMT").format("ddd, D MMM YYYY HH:mm:ss z");
}

app.use(allowCrossDomain);
app.use(express.json())

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
app.post("/problem", async (req, res) => {
    //submits problem to NCR API
    const { storeId, productId, description, email } = req.body;

    // first, we need to get the product so we can check the version.
    try {

        let path = '/catalog/v2/items/' + productId;

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

        let response = JSON.parse(await request(options));
        delete response.itemId;
        delete response.auditTrail;
        let { version, dynamicAttributes } = response;
        console.log(productId, version);

        const updateDynamicAttribute = (dyn, key, val) => {
            if (val.length > 512) {
                val = val.substring(0, 512);
            }
            const existingAttribute = dyn.attributes.find(d => d.key == key)
            if (existingAttribute) {
                existingAttribute.value = val;
            } else {
                dyn.attributes.push({
                    key,
                    value: val
                })
            }
            if (val.length < 1) {
                // want to delte it, because we want the value to be different than before
                delete dyn.attributes.find(d => d.key == key);
            }
            return dyn;
        }

        let brokenAttribute = dynamicAttributes[0];
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenDate", new Date().toString());
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "broken", true);
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenDescription", description);
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenStoreId", storeId);
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenEmail", email);

        let newBody = {
            ...response,
            version: ++version,
            dynamicAttributes: [brokenAttribute]
        }

        // same path as last time, just a PUT request with body
        var options = {
            'method': 'PUT',
            'url': 'https://api.ncr.com' + path,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': getAccessKey(path, 'PUT'),
                'nep-organization': 'test-drive-890477f1b75e491b910d3',
                'Date': dateString(),
            },
            body: JSON.stringify(newBody)
        }

        const putResponse = await request(options);

        res.status(200).send("success");
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
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