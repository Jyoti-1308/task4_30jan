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


app.post("/myServer", async function (req, res) {

    let body = req.body;
    console.log(body);
    if (body.method === "POST") {
    
            let ele = body.header.find(ele => {
                if (ele.key) {
                    console.log(ele.key, ele.value);
                    return ele.key.toLowerCase() === "authorization";
                }
            });
            if (!ele.value)
                res.status(401).send({ err_code: 401, err_message: "No token found. Provide a valid token" });
            else {
                let body = req.body;
                console.log(body.data);
                axios.post(body.fetchURL, body.data, { headers: { authorization: ele.value } })
                    .then(function (response) {
                        // console.log(response.data);
                        console.log("inside post data")
                        res.status(200).json(response.data);
                    })
                    .catch(function (err) {
                        if (err.response) {
                            // console.log(err.response);
                            let { status, statusText } = err.response;
                            console.log("inside post data catch")
                            // console.log(status, statusText);
                            let json = { err_code: status, err_message: statusText };
                            // console.log(json);
                            res.status(401).send(json);
                        }
                    });
            
        }
    }
    if (body.method === "PUT") {
    
        let ele = body.header.find(ele => {
            if (ele.key) {
                console.log(ele.key, ele.value);
                return ele.key.toLowerCase() === "authorization";
            }
        });
        if (!ele.value)
            res.status(401).send({ err_code: 401, err_message: "No token found. Provide a valid token" });
        else {
            let body = req.body;
            console.log(body.data);
            axios.put(body.fetchURL, body.data, { headers: { authorization: ele.value } })
                .then(function (response) {
                    // console.log(response.data);
                    console.log("inside PUT data")
                    res.status(200).json(response.data);
                })
                .catch(function (err) {
                    if (err.response) {
                        // console.log(err.response);
                        let { status, statusText } = err.response;
                        console.log("inside PUT data catch")
                        // console.log(status, statusText);
                        let json = { err_code: status, err_message: statusText };
                        // console.log(json);
                        res.status(401).send(json);
                    }
                });
        
    }
}
if (body.method === "DELETE") {
    
    let ele = body.header.find(ele => {
        if (ele.key) {
            console.log(ele.key, ele.value);
            return ele.key.toLowerCase() === "authorization";
        }
    });
    if (!ele.value)
        res.status(401).send({ err_code: 401, err_message: "No token found. Provide a valid token" });
    else {
        
        axios.delete(body.fetchURL, { headers: { authorization: ele.value } })
            .then(function (response) {
                // console.log(response.data);
                console.log("inside Delete data")
                res.status(200).json(response.data);
            })
            .catch(function (err) {
                if (err.response) {
                    // console.log(err.response);
                    let { status, statusText } = err.response;
                    console.log("inside Delete data catch")
                    // console.log(status, statusText);
                    let json = { err_code: status, err_message: statusText };
                    // console.log(json);
                    res.status(401).send(json);
                }
            });
    
}
}   
    
    //get request
    if (body.method === "GET") {
        
        console.log(body.fetchURL);
        if (body.fetchURL === (baseUrl + "/getToken")) {
            try {
                let response = await axios.get(body.fetchURL);
                console.log("inside get url axios");
                console.log(response.data);
                // res.sendStatus(200).json(response.data);
                // res.send(response)
                res.status(200).json(response.data);
            }
            catch (err) {
                if (err.response) {
                    let { status, statusText } = err.response;
                    console.log("inside normal get fetchURl");
                    console.log(status, statusText);
                    let json = { err_code: status, err_message: statusText };
                    res.status(401).send(json);
                }
            }
        }
        else {
            console.log(body.header);
            let ele = body.header.find(ele => {
                if (ele.key) {
                    console.log(ele.key, ele.value);
                    return ele.key.toLowerCase() === "authorization";
                }
            });
            if (!ele.value)
                res.status(401).send({ err_code: 401, err_message: "No token found. Provide a valid token" });
            else {
                axios.get(body.fetchURL, { headers: { authorization: ele.value } })
                    .then(function (response) {
                        console.log(response);
                        res.status(200).json(response.data);
                    })
                    .catch(function (err) {
                        if (err.response) {
                            let { status, statusText } = err.response;
                            console.log("inside get students catch")
                            // console.log(status, statusText);
                            let json = { err_code: status, err_message: statusText };
                            console.log(json);
                            res.status(401).send(json);
                        }
                    });
            }
        }
    }
})









