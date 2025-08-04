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
        const token=jwt.sign({ id:newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000}); 

        res.status(201).json({message:"User created successfully", user: newUser, token });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid=await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token=jwt.sign({id:user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000}); 

        res.status(200).json({ message: 'Login successful', user, token });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}