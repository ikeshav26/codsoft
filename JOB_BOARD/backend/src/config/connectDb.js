import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected`);
    }catch(error){
        console.error(`Error connecting to the database: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;