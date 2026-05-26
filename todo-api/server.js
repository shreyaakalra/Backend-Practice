import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import 'dotenv/config';
import { body, validationResult } from 'express-validator';

import connectDB from "./db.js";
import User from "./models/User.js";
import Todo from './models/Todo.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express();
const PORT = 5001;

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.post('/sign-up', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Min 6 characters.'),
    body('name').notEmpty().withMessage('Name is required')
], async(req,res) => {
    try{
        // validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

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

app.post('/login', [
    body('email').notEmpty().withMessage("Email can't be empty"),
    body('password').notEmpty().withMessage("Password can't be empty")
],async(req, res) => {
    try{
        // validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

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
        res.status(200).json({token});

    } catch(err){
        res.status(500).json({err: "Something went wrong"});
    }
});

app.post('/todos', authMiddleware, [
    body('title').notEmpty().withMessage("Title cannot be empty!"),
    body('description').notEmpty().withMessage("Description cannot be empty")
], async(req, res) => {
    try{
        // validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

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

app.get('/todos', authMiddleware, async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit  = parseInt(req.query.limit) || 10;

    const skip = (page-1) * limit;

    try{
        const todos = await Todo.find({owner: req.user.id})
            .skip(skip)
            .limit(limit);

        const total = await Todo.countDocuments({owner: req.user.id});

        res.status(200).json({
            todos,
            pagination: {
                page,
                limit,
                total
            }
        });

    } catch(err){
        res.status(500).json({message: "Something went wrong"});
    }
})

app.put('/todos/:id', authMiddleware, [
    body('title').optional().notEmpty().withMessage("Title cannot be empty!"),
    body('description').optional().notEmpty().withMessage("Description cannot be empty")
], async(req, res) => {
    try{

        // validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        // getting new title and description
        const {title, description} = req.body;

        // getting the todo that needs to be updated
        const todo = await Todo.findById(req.params.id);

        // check if todo exists
        if(!todo){
            return res.status(404).json({ message: "Todo not found"});
        }

        // check if the todo owner is the one who's actually logged in
        if(todo.owner.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized!"});
        }

        // update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        res.status(200).json(updatedTodo);

    } catch(err){
        res.status(500).json({ message: "Something went wrong!" });
    }
})

app.delete('/todos/:id', authMiddleware, async(req, res) => {

    try{
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({message: "todo not found!"});
        }

        if(todo.owner.toString() !== req.user.id){
            return res.status(403).json({message: "Not authorized!"});
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Todo deleted"});

    } catch(err){
        res.status(500).json({message: "something went wrong!"});
    }
    
})

if(process.env.NODE_ENV !== "test"){
    app.listen(PORT, ()=>{
        console.log("server is listening at port 5001");
    })
}

export default app; // so that supertest can use it