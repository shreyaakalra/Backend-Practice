import express from "express";
import connectDB from "./db.js"
import bcrypt from "bcrypt"
import "dotenv/config"
import User from "./models/User.js"
import jwt from "jsonwebtoken"
import authMiddleware from "./middleware/authMiddleware.js"
import Expenses from "./models/Expenses.js"

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
            {expiresIn: "6h"}
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
            {expiresIn: '6h'}
        )

        res.status(200).json({token});

    } catch(err){
        return res.status(404).json({
            error: `ERROR: ${err}`
        })
    }
});

// get expenses
app.get('/expenses{/:filter}', authMiddleware, async(req, res) => {
    try{
        const filter = req.params.filter;
        const user = req.user.id;
        const expenses = await Expenses.find({owner: user});

        if(expenses.length === 0){
            return res.status(200).json({
                "expenses": expenses
            });
        }

        if(!filter){
            return res.status(200).json({
                "expenses": expenses 
            });
        }

        const filteredExpenses = expenses.filter((expense) => expense.category === filter);

        res.status(200).json({
            "expenses": filteredExpenses
        });


    } catch(err){
        res.status(500).json({
            error: "Internal Server Error"
        })
        console.log(err);
    }
});

// create expense
app.post('/add-expense', authMiddleware, async(req, res) => {
    try{
        
        const { title, moneySpent, category } = req.body;

        const user = req.user.id;

        if(!title || !moneySpent){
            return res.status(400).json({
                error: "make sure you have added title, moneyspent and category!"
            })
        }

        const newExpense = new Expenses({
            title,
            moneySpent,
            category: category? category.toLowerCase() : "others",
            owner: user
        })

        await newExpense.save();

        res.status(200).json({
            message: "Expense created!"
        })

    } catch(err){
        res.status(500).json({
            error: "Internal Server Error"
        })
        console.log(err);
    }
});

// update expense
app.put('/update-expense/:id', authMiddleware, async(req, res) => {
    try{
        
    } catch(err){

    }
});

// delete expense
app.delete('/delete-expense/:id', authMiddleware, async(req, res) => {
    try{
        const user = req.user.id;
        const expenseID = req.params.id;
        
        const expense = await Expenses.findById(expenseID);

        if(!expense){
            return res.status(400).json({
                message: "no expense with this id exists"
            })
        }

        if(expense.owner.toString()!==user){
            return res.status(403).json({
                message: "you're not authorized"
            })
        }

        await Expenses.findByIdAndDelete(expenseID);

        res.status(201).json({
            message: "Deleted Successfully"
        })

    } catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        });
        console.log(err);
    }
});




app.listen(PORT, ()=>{
    console.log("SERVER IS LISTENING AT PORT 5001");
})

