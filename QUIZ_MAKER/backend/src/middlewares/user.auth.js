import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';



export const userAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: "Invalid token" });
        }
        const user=await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user._id;
        next();
    }catch(error){
        console.error("Authentication error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}