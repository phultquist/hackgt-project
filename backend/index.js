import Express, { response } from "express";

const app = Express();

//getting locations of all products in catalog
app.post("/locations", (req, res) => {
    const { body } = req;
    let locationList = [{
        locationId: "1234567", //linked list, call all locations and catalogid, could be dumb
        catalogId: "1234567"
    },
    {
        locationId: "1234567",
        catalogId: "1234567"
    }];

    //returning locationId and catalogId
    res.status(200).json(locationList);
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
        problem = "problems with product",
        locationId: "1234567",
        catalogId: "1234567",
        itemId: "1234567",
        description: "1234567"
    }]
    //submits history of problem to NCR API

    //submit request to NCR API

    res.status(200).json(historyList);
})



