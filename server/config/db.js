import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

const connection = asyncHandler(async () => {
    try{
       await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:false,
        useUnifiedTopology:false
       })
       console.log('MongoDB is connected...');
    }catch(error){
        console.log(error);
        throw new Error('MongoDB connection failed...');
    }
})

export default connection;