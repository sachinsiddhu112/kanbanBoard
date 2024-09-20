import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



import User from "../models/userModel.js";


export const login =async (req,res) => {
    

    const {username, password} = req.body;
     try{
        if(!username || !password){
            res.status(400).json({error:"Please provide username and password."});
            return;
        }
        const user = await User.findOne({username:username});
        if(!user){
           res.status(404).json({error:"User does not exist,Please sign up."});
           return;
        }
        const isMatch =  bcrypt.compareSync(password,user.password);
        if(!isMatch){
            res.status(401).json({error:"Wrong Password."});
            return;
        }
        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);//sending response and authToken.
        res.status(200).json({ authToken, user });

     }
     catch(err){
        console.log(err);
        res.status(500).json({error:"Server side error."});
        return;
     }
}
export const signup = async(req,res) => {
    const{username, email, password,confirmPassword} = req.body;
    try{
    if(!username || !email || !password || !confirmPassword) {
        res.status(400).json({error:"Please provide all credentials."});
        return;
    }
    if(password != confirmPassword){
        res.status(400).json({error:"Password and Confirm Password are not matching."});
        return;
    }
    const user = await User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });
    if(user){
        res.status(409).json({error:"Please provide unique userename and email."});
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
        username: username,
        email: email,
        password: hash
    })
    const data = {
        user: {
            id: newUser._id
        }
    }
    
    //creating authToken with jwt.
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    const response = await newUser.save();
    res.status(200).json({ response, authToken });
}
catch(err){
    console.log(err);
    res.status(500).json({error:"Server side error."});
}
}