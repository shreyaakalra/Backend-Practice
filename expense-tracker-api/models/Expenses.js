import mongoose from "mongoose";
const { Schema } = mongoose;

const expenseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    moneySpent: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps: true
})

const Expenses = mongoose.model("Expenses", expenseSchema);
export default Expenses;