import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

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
        res.status(201).json({message: 'User created successfully', user: newUser});
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

        res.status(200).json({message: 'Login successful', user});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
}