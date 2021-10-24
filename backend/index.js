import express from 'express';
import request from 'request-promise';
import moment from 'moment-timezone'
import getAccessKey from './auth.js';

const app = express();

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*");
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
    try {
        const catalog = await getCatalogItems();
        res.status(200).send(catalog.map(item => {
            return {
                name: item.shortDescription.value,
                slug: item.itemId.itemCode
            }
        }));
    } catch (e) {
        res.status(500).send("error")
        throw new Error(e);
    }

});

const getCatalogItems = async () => {
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

    const result = JSON.parse(await request(options)).pageContent;
    return result;
}

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
            const existingAttribute = dyn.attributes.find(d => d.key == key) ?? null;
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

        let brokenAttribute = { type: "String", attributes: [] };
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenDate", new Date().toString());
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenStatus", "broken");
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenDescription", description);
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenStoreId", storeId);
        brokenAttribute = updateDynamicAttribute(brokenAttribute, "brokenEmail", email);

        let newBody = {
            ...response,
            version: ++version,
            dynamicAttributes: [...dynamicAttributes, brokenAttribute]
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
    const catalog = await getCatalogItems();

    let detailedCatalog = await Promise.all(catalog.map(async item => {
        const id = item.itemId.itemCode;

        // get catalog item with that ID
        const path = '/catalog/v2/items/' + id
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

        const result = JSON.parse(await request(options));
        return result
    }));

    // filter each catalogItem that has 
    const filteredCatalog = detailedCatalog.filter(item => {
        return item.dynamicAttributes.some(dynAttr => {
            // checks if any attribute has a key of "brokenStatus"
            const attributes = dynamicAttributeToObject(dynAttr.attributes);
            return Object.keys(attributes).includes("brokenStatus");
        });
    });
    console.log(filteredCatalog.map(item => item.itemId.itemCode));

    let problemHistory = [];
    filteredCatalog.forEach(item => {
        item.dynamicAttributes.forEach((dynAttr, i) => {
            const attributes = dynamicAttributeToObject(dynAttr.attributes);
            if (Object.keys(attributes).includes("brokenStatus")) {
                console.log(item.shortDescription);
                problemHistory.push({
                    storeId: attributes.brokenStoreId,
                    itemCode: item.itemId.itemCode,
                    reportIndex: i,
                    itemName: (item.shortDescription.values.find(a => a.locale == "en-US") || item.shortDescription.values[0]).value,
                    email: attributes.brokenEmail,
                    date: attributes.brokenDate,
                    status: attributes.brokenStatus,
                    description: attributes.brokenDescription
                });
            }
            // console.log(attributes);
        });
    });

    problemHistory = await Promise.all(
        problemHistory.map(async problem => {
            const path = '/site/sites/' + problem.storeId;

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

            const siteInfo = JSON.parse(await request(options));
            const { street, city, state, postalCode } = siteInfo.address;

            return {
                ...problem,
                siteInfo: {
                    address: `${street} ${city}, ${state} ${postalCode}`,
                    coordinates: siteInfo.coordinates,
                    name: siteInfo.siteName
                }
            }
        })
    );

    res.status(200).json(problemHistory.sort((a,b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    }));
})

app.put('/update-status', async (req, res) => {
    const { itemCode, reportIndex, newStatus } = req.body;

    // get catalog item with that ID
    const path = '/catalog/v2/items/' + itemCode
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

    const response = JSON.parse(await request(options));
    delete response.itemId;
    delete response.auditTrail;
    response.dynamicAttributes[reportIndex].attributes.find(attr => attr.key == "brokenStatus").value = newStatus;

    let newBody = {
        ...response,
        version: ++response.version,
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
    res.send("success");
});

const dynamicAttributeToObject = (dynAttr) => {
    //dynAttributes should input the attributes field, which is an array
    const entries = new Map(dynAttr.map(attr => [attr.key, attr.value]));
    return Object.fromEntries(entries);
};

app.listen(5000)