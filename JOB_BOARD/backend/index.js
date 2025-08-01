import express from "express"
import dotenv from 'dotenv';
import connectDB from "./src/config/connectDb.js";
import userRoutes from './src/routes/user.routes.js'
import jobRoutes from './src/routes/job.routes.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.get('/', (req, res) => {
    res.send('Welcome to the Job Board API');
});

app.use('/api/users',userRoutes)
app.use('/api/jobs',jobRoutes)




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})