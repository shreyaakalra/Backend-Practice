import mongoose from "mongoose"
import 'dotenv/config';

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("MongoDB connected!");
    } catch(err){
        console.log("MongoDB not connected", err);
    }
}
