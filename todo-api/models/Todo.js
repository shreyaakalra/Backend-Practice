import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
    title:{
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;