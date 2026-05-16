import express from "express";
import connectDB from "./db.js";
import User from "./models/User.js";
import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Todo from './models/Todo.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express();
const PORT = 5001;

app.use(express.json());

connectDB();

app.post('/sign-up', async(req,res) => {
    try{
        // taking name email and pass from body
        const { name, email, password } = req.body;

        // checking if user already exists
        const reqEmail = await User.findOne({email});

        // if it exists send status 400
        if(reqEmail){
            return res.status(400).json("User already exists. Try logging in instead!");
        }

        // if doesn't exist then bcrypt the password and put the crypted pass in hashedPass
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // create a new user with all the info and the new hashed pass
        const newUser = new User({
            name,
            email,
            password: hashedPass
        })

        // save the new user in database
        await newUser.save();

        // need to generate a JWT token now so that the system remembers the users
        const token  = jwt.sign(
            {id: newUser._id}, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        // give token back to the frontend
        res.status(201).json({token});

    } catch(err){
        res.status(500).json({error: "Something went wrong!"})
    }
})

app.post('/login', async(req, res) => {
    try{
        // get access of token from the body
        const { email, password } = req.body;

        // check if user already exists
        const user = await User.findOne({ email });

        // if it doesnt return invalid details
        if(!user){
            return res.status(404).json({message: "Invalid credentials"});
        }

        // if email exists check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);


        // if wrong pass
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"});
        }

        // create a token again
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        // return a token to the frontend
        res.status(300).json({token});

        app.post('/todos', authMiddleware, async(req, res) => {
    try{
        const {title, description} = req.body;

        const newTodo = new Todo({
            title,
            description,
            owner: req.user.id  // comes from authMiddleware
        });

        await newTodo.save();
        res.status(201).json(newTodo);

    } catch(err){
        res.status(500).json({message: "Something went wrong!"});
    }
});



    } catch(err){
        res.status(500).json({err: "Something went wrong"});
    }
});



app.listen(PORT, ()=>{
    console.log("Server is Listening at port 5001!");
})