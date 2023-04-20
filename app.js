const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) {
  const apiKey = "87b69aedb4239520837ef0c18e935b9f";
  const unit = "metric";
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const whetherData = JSON.parse(data);
      const temp = whetherData.main.temp;
      const whetherDes = whetherData.weather[0].description;
      const icon = whetherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>" + whetherDes + "</p>");
      res.write(
        "<h1>Whether in the " + query + " is " + temp + " degree celcius</h1>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server Has started at 3000");
});
