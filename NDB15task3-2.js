var express = require("express");
var app = express();
let fs = require("fs");
let axios = require("axios");
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});


const port = process.env.PORT || 2410;

app.listen(port, () => console.log(`Node App listening on port ${port}!`));


app.post("/myServer", function (req, res) {

    let body = req.body;
    console.log(body);
    if (body.method === "POST") {
        // let data2=JSON.parse(body.data1);
        axios.post(body.fetchURL, body.data)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (err) {
                // if(err.response)
                // console.log(err.response);
                let { status, statusText } = err.response;
                console.log(status, statusText);
                let json = { err_code: status, err_message: statusText };
                console.log(json);
                res.status(401).send(json);

            });
    }
    if (body.method === "GET") {
        axios.get(body.fetchURL)
            .then(function (response) {
                console.log(response.data);
                res.send(response);
            })
            .catch(function (err) {
                let { status, statusText } = err.response;
                console.log(status, statusText);
                let json = { err_code: status, err_message: statusText };
                console.log(json);
                res.status(401).send(json);
            });
    }

})









