import express from "express";

const app = express();
let PORT = 5001;

app.get(express.json());

// sign-up route
app.post('/sign-up', (req, res) => {
    try{

    } catch(err){

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

