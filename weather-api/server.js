require('dotenv').config();
const axios = require('axios');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/weather/:city", async (req, res) => {
    try{
        const city = req.params.city;

        const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`);

        const geoData = geoRes.data;

        if(!geoData) throw new Error("city not found");

        const {lat, lon} = geoData[0];

        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);

        res.json(weatherRes.data);

        console.log("Fetching for city:", city);
        console.log("Using API Key:", process.env.WEATHER_API_KEY ? "Key Found ✅" : "Key Missing ❌");

    } catch (error) {
        console.error("The API crashed", error.message);
    }
})


app.listen(PORT, () => {
    console.log(`server is listening on the port: http://localhost:${PORT} `);
})