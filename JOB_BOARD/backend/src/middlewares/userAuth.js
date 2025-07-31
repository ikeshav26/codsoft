import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userAuth=(req,res,next)=>{
    try{
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export default userAuth;