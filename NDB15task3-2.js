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


const port = 2410;
let baseUrl = "https://repo-8qu2.onrender.com/studentServer";
app.listen(port, () => console.log(`Node App listening on port ${port}!`));


app.post("/myServer", function (req, res) {

    let body = req.body;
    console.log(body);
    if (body.method === "POST") {
        // let data2=JSON.parse(body.data1);
        axios.post(body.fetchURL, body.data)
            .then(function (response) {
                // console.log(response);
                res.send(response);

            })
            .catch(function (err) {
                if (err.response) {
                    // console.log(err.response);
                    let { status, statusText } = err.response;
                    console.log(status, statusText);
                    let json = { err_code: status, err_message: statusText };
                    console.log(json);
                    res.status(401).send(json);
                }
            });
    }
    if (body.method === "GET") {
        if (body.fetchURL === (baseUrl + "/students")) {
            console.log(body.key1);
            let value = body.key1 && (body.key1.toLowerCase() === "authorization") ? body.value1 : "";

            axios.get(body.fetchURL, { headers: { authorization: value } })
                .then(function (response) {
                    console.log(response);
                    res.send(response);
                })
                .catch(function (err) {
                    if (err.response) {
                        let { status, statusText } = err.response;
                        console.log(status, statusText);
                        let json = { err_code: status, err_message: statusText };
                        console.log(json);
                        res.status(401).send(json);
                    }
                });
        }
        else 
        if (body.fetchURL === (baseUrl + "/getToken")) {
            console.log("inside base url get token");
            axios.get(body.fetchURL)
                .then(function (response) {

                    console.log(response);
                    res.send(response);
                })
                .catch(function (err) {
                    if (err.response) {
                        let { status, statusText } = err.response;
                        console.log(status, statusText);
                        let json = { err_code: status, err_message: statusText };
                        console.log(json);
                        res.status(401).send(json);
                    }
                });
        }
        else {
            axios.get(body.fetchURL)
                .then(function (response) {
                    // console.log("inside get url axios");
                    // console.log(response.data);
                    res.send(response);

                })
                .catch(function (err) {
                    if (err.response) {
                        let { status, statusText } = err.response;
                        console.log(status, statusText);
                        let json = { err_code: status, err_message: statusText };
                        console.log(json);
                        res.status(401).send(json);
                    }
                });
        }
    }

})









