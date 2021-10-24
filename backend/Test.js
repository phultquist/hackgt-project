import express from 'express';
const app = express();

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

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'hackgtncr@gmail.com',
              pass: 'hackathontechncr'
            }
          });
          
          var mailOptions = {
            from: 'hackgtncr@gmail.com',
            to: 'hackgtncr@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'There is an issue with one of your vending machines. Please send people to look over.'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});
