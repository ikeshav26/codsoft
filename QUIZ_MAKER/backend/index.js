import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnect from './src/config/dbConnection.js';
import userRoutes from './src/routes/user.routes.js';
import quizRoutes from './src/routes/quiz.routes.js';

const app=express();
dotenv.config();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users',userRoutes)
app.use('/api/quiz',quizRoutes)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})