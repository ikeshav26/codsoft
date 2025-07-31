import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



export const signup=async(req,res)=>{
    try{
        const {username,email,password,role}=req.body;
        if(!username || !email || !password || !role){
            return res.status(400).json({message: 'All fields are required'});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            username,
            email,
            password:hashedPassword,
            role
        })

        await newUser.save();

        const token=jwt.sign({id:newUser._id,role:newUser.role},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000}); 

        res.status(201).json({message: 'User created successfully', user: newUser, token});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}


export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000}); 

        res.status(200).json({message: 'Login successful', user, token});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const Logout=async(req,res)=>{
    try{
        res.clearCookie('token', {httpOnly: true, secure: true, sameSite: 'None'});
        res.status(200).json({message: 'Logout successful'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const userData=async(req,res)=>{
    try{
        console.log(req.user)
        const user=req.user.id;
        if(!user){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const userData=await User.findById(user).select('-password');
        if(!userData){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({user: userData});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

