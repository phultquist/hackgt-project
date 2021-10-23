import express from 'express';
import request from 'request';
import moment from 'moment-timezone'

const app = express();

//getting locations of all products in catalog
app.get("/locations", (req, res) => {

    const dateString = moment().tz("GMT").format("ddd, D MMM YYYY HH:mm:ss z")
    console.log(dateString);
    var options = {
        'method': 'POST',
        'url': 'https://api.ncr.com/site/sites/find-by-criteria',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'AccessKey 2e1f6f77e9674006838270fcb95477f7:jn7BLTJE3KLaIw8v3p+ubN7V8/ZMdU8rIolwCi6B2RSafzkOO9Or1eZGPV6m5B74jTwt443/jHM+q2mg+BF0OA==',
            'nep-organization': 'test-drive-890477f1b75e491b910d3',
            'Date': dateString
        },
        body: JSON.stringify({
            "criteria": {
                "status": "ACTIVE"
            }
        })
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.status(200).send(response.body);
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