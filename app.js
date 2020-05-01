const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.render("index");
});

app.post("/weather", function (req, res) {
	var city = req.body.city;

	if (city === "") {
		res.render("error");
	} else {

		request("http://api.openweathermap.org/data/2.5/weather?id=" + city + "&lang=hr&appid=<YOUR_API_KEY>", function (err, response, body) {
			var data = JSON.parse(body);

			var trenutna1 = ((data.main.temp) - 273.15).toString();
			var trenutna = Number(trenutna1.slice(0, 5));

			var osjet1 = ((data.main.feels_like) - 273.15).toString();
			var osjet = Number(osjet1.slice(0, 5));

			var min1 = ((data.main.temp_min) - 273.15).toString();
			var min = Number(min1.slice(0, 5));

			var max1 = ((data.main.temp_max) - 273.15).toString();
			var max = Number(max1.slice(0, 5));

			var picture = data.weather[0].icon;

			if (trenutna <= 7 && city == 3143244) {
				var message = "Hladnije je od prosjeka.";
				var img = "/cold.png";
			} else if (trenutna >= 17 && city == 3143244) {
				var message = "Toplije je od prosjeka.";
				var img = "/hot.png";
			} else if (trenutna > 7 && trenutna < 17 && city == 3143244) {
				var message = "Temperatura je prosječna.";
				var img = "/average.png";
			} else if (trenutna <= 15 && city == 5368361) {
				var message = "Hladnije je od prosjeka.";
				var img = "/cold.png";
			} else if (trenutna >= 24 && city == 5368361) {
				var message = "Toplije je od prosjeka.";
				var img = "/hot.png";
			} else if (trenutna > 15 && trenutna < 24 && city == 5368361) {
				var message = "Temperatura je prosječna.";
				var img = "/average.png";
			} else if (trenutna <= 13 && city == 3186886) {
				var message = "Hladnije je od prosjeka.";
				var img = "/cold.png";
			} else if (trenutna >= 22 && city == 3186886) {
				var message = "Toplije je od prosjeka.";
				var img = "/hot.png";
			} else if (trenutna > 13 && trenutna < 22 && city == 3186886) {
				var message = "Temperatura je prosječna.";
				var img = "/average.png";
			} else {
				var message = "Nema podataka o prosječnoj temperaturi.";
				var img = "/no-data.png";
			}

			res.render("index1", {
				data: data,
				trenutna: trenutna,
				osjet: osjet,
				min: min,
				max: max,
				picture: picture,
				message: message,
				img: img
			});
		});
	}
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server is running.")
});