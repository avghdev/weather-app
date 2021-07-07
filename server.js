const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const apiKey = "dd0add5373617173b98acd128cc9bcc9"
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: "Error, please try again!"})
        }
        else {
            let weather = JSON.parse(body)

            if (weather.main === undefined) {
                res.render('index', {weather: null, error: "Error, please try again!"})
            }
            else {
                let weatherText = `Its ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null})
            }
        }
    })
})

app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})