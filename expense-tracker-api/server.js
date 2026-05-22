import express from "express";
import connectDB from "./db.js"
import bcrypt from "bcrypt"

const app = express();
let PORT = 5001;

connectDB();

app.get(express.json());

// sign-up route
app.post('/sign-up', async(req, res) => {
    try{
        const { name, email, password } = req.body;

        // now that we have the email first check if it already exists in the database

        if(!name || !email || !password){
            return res.status(403).json({
                error: "ENTER YOUR NAME EMAIL AND PASS"
            });
        }

        const reqEmail = User.findOne({email});

        if(reqEmail){
            return res.status(403).json({
                error: "User Already Exists"
            });
        }

        // should bcrypt the password first
        const salt = bcrypt.genSalt(10);
        const hashedPass = bcrypt.hash(password, salt);

        const newUser = await new User({
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

        return res.status(200).json({token})

    } catch(err){
        res.status(500).json({
            error: "Something went wrong!"
        });
    }
});

// log-in route
app.post('/login', (req, res) => {
    try{

    } catch(err){

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

