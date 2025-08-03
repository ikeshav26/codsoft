import mongoose from 'mongoose';

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    }catch(err){
        console.error("Database connection failed:", err);
    }
}

export default dbConnect;