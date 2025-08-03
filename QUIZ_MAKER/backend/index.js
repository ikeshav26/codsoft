import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})