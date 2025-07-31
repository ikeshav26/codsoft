import express from "express"
import dotenv from 'dotenv';
import connectDB from "./src/config/connectDb.js";
dotenv.config();

const app = express();
connectDB();


app.get('/', (req, res) => {
    res.send('Welcome to the Job Board API');
});





app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})