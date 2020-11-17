const express = require("express");
const PORT = 2000;
const path = require("path");
const bodyParser = require("body-parser");
const request = require('request');
const moment = require("moment")
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.get("/", function (req, res) {
    res.render("index",{date:null, cases:null,country:null})
})

app.post("/countrySelect", (req, res) => {
  
    request({
        method: "GET",
        uri:`https://api.covid19api.com/dayone/country/${req.body.country}/status/confirmed`,
    }, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                let data = JSON.parse(body);
                let date = [];
                let cases = [];
                data.forEach(element => {
                    date.push(moment(element.Date).format("MMM Do YY"));
                    cases.push(element.Cases);
                });
                res.render("index",{date:date,cases:cases,country:req.body.country})
            }
            
    })
});

//istening to the port

app.listen(PORT, () => {
    console.log(`The server started on PORT ${PORT}`);
});