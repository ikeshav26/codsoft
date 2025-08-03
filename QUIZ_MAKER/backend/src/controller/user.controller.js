import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword=await bcrypt.hash(password, 10);
        const newUser=await User.create({name,email,password:hashedPassword});
        const token=jwt.sign({ id:newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',sameSite:'None' });

        res.status(201).json({message:"User created successfully", user: newUser, token });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}