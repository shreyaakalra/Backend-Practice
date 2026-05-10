import 'dotenv/config';
import axios from 'axios';
import express from 'express';
import redisClient from './redisClient.js';

const app = express(); // builds the server
const PORT = process.env.PORT || 5001; // decides which door the server will listen to

app.use(express.json()); // if user sends data in JSON formt it reads and understands instead of panicking

redisClient.connect(); // connect to redis when the server boots up

// GET means a user is asking for information. req is what user asked for and res is how u talk back to them.
// here :city means its dynamic to be accessed from parameters.
app.get("/api/weather/:city", async (req, res) => {
    // try to run this code and if anything crashes dont shut down just jump to the catch block instead.
    try{
        const city = req.params.city.toLowerCase();

        const cacheKey = `weather:${city}`;

        const cachedData = await redisClient.get(cacheKey);

        if(cachedData){
            console.log(`Cache hit for city ${city}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log("Cache MISS - fetching from API")

        // You tell your Messenger (Axios) to go to OpenWeatherMap and ask for the coordinates
        const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`);

        // Axios brings back a lot of extra garbage (headers, network status codes). This line rips open the package and grabs just the actual data inside.
        const geoData = geoRes.data;

        if(!geoData) throw new Error("city not found");

        const {lat, lon} = geoData[0];

        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);

        // The Delivery. You hand the final weather data back to the user's browser. The moment this line runs, the user sees the JSON on their screen.
        res.json(weatherRes.data);

        await redisClient.set(
            cacheKey, // the key:   "weather:london"
            JSON.stringify(weatherRes.data), // the value: must be a string
            { EX: 600 } // EX = expires in 600 seconds (10 min)
        )

        // After 10 minutes, Redis auto-deletes it. Next request fetches fresh data.

    } catch (error) {
        console.error("The API crashed", error.message);
        // if it crashes the user gets showed this as a response instread of infinite spinner
        res.status(500).json({ error: "Failed to fetch weather" });
    }
})


app.listen(PORT, () => {
    console.log(`server is listening on the port: http://localhost:${PORT} `);
})