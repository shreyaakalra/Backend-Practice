import express from "express";
import connectDB from "./db.js"
import bcrypt from "bcrypt"
import "dotenv/config"
import User from "./models/User.js"
import jwt from "jsonwebtoken"

const app = express();
let PORT = 5001;

connectDB();

app.use(express.json());

// sign-up route
app.post('/sign-up', async (req, res)=>{
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(404).json({
                error: "bro add name email and password"
            })
        }

        const reqEmail = await User.findOne({email});

        if(reqEmail){
            return res.status(400).json({
                error: "User already exists!"
            });
        }

        const salt  = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPass
        });

       await newUser.save();

        const token = jwt.sign(
            {id: newUser._id},
            process.env.PRIVATE_KEY,
            {expiresIn: "1h"}
        )

        res.status(200).json({token});


    } catch(err){
        return res.status(404).json({
            error: `ERROR: ${err}`
        })
    }
})

// log-in route
app.post('/login', async(req, res) => {
    try{

        // to login first we'd need to check if the email even esxists and for that we need a fucking email
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.json({
                error: "User doesn't exist. Sign up first."
            })
        }

        const checkPass = await bcrypt.compare(password, user.password);

        if(!checkPass){
            return res.status(404).json({
                error: "wrong password"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.PRIVATE_KEY,
            {expiresIn: '1h'}
        )

        res.status(200).json({token});

    } catch(err){
        return res.status(404).json({
            error: `ERROR: ${err}`
        })
    }
});

// get expenses
app.get('/expenses/:filter', (req, res) => {
    try{
        
    } catch(err){

    }
});

// create expense
app.post('/add-expense', (req, res) => {
    try{

    } catch(err){

    }
});

// update expense
app.put('/update-expense/:id', (req, res) => {
    try{

    } catch(err){

    }
});

// delete expense
app.delete('/delete-expense/:id', (req, res) => {
    try{

    } catch(err){

    }
});




app.listen(PORT, ()=>{
    console.log("SERVER IS LISTENING AT PORT 5001");
})

