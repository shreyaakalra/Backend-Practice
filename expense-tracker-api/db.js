import 'dotenv/config'
import mongoose from "mongoose"

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB is connected lessgoooo.")

    } catch(err){
        console.log("DB not connected, some error has occured!", err);
    }
}