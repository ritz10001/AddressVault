const asyncHandler = require("express-async-handler");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

//REGISTER CONTROLLER
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, username, password} = req.body;
    if(!name || !email || !username || !password){
        res.status(400);
        throw new Error("Please fill up all the fields!");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("This user already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        username,
        password: hashedPassword
    });

    if(newUser){
        res.status(201).json({_id: newUser.id, name: newUser.name, email: newUser.email});
    }
    else{
        res.status(400);
        throw new Error("Invalid User information");
    }
});

//LOGIN CONTROLLER
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill up all the fields");
    }

    const user = await User.findOne({email});
    console.log(user);

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                id: user.id
            }
        }, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "1m"});
        res.status(200).json({accessToken, status: "success", name: user.name, id: user.id});
    }
    else{
        res.status(401);
        throw new Error("Incorrect username or password");
    }
    
}); 

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {registerUser, loginUser, currentUser};