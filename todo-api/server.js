import express from "express";
import connectDB from "./db.js";

const app = express();
const PORT = 5001;

app.use(express.json());

connectDB();

app.post(('/sign-up'), (req,res) => {
    const {email, password} = req.body;

    
})

app.listen(PORT, ()=>{
    console.log("Server is Listening at port 5001!");
})