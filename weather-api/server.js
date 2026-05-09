require('dotenv').config();
const axios = require('axios');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/weather/:city", async (req, res) => {
    try{
        
    }
})



app.listen(PORT, () => {
    console.log(`server is listening on the port: http://localhost:${PORT} `);
})