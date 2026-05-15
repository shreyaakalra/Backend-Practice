import express from "express";

const app = express();

const PORT = 5001;

app.use(express.json());

app.listen(PORT, ()=>{
    console.log("Server is Listening at port 5001!");
})