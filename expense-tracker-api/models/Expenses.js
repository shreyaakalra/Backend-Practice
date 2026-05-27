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
        required: true,
        enum: ['groceries', 'leisure', 'electronics', 'utilities', 'clothing', 'health', 'others'],
        default: 'others'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{
    timestamps: true
})

const Expenses = mongoose.model("Expenses", expenseSchema);
export default Expenses;