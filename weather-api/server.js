require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "The weather API engine is running!"});
})

app.listen(PORT, () => {
    console.log(`server is listening on the port: http://localhost:${PORT} `);
})