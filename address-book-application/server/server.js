const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/userSchema");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ritz10001:admin@cluster0.jktyax6.mongodb.net/");

app.post('/login', (req, res) => {
    const {name, email, username, password} = req.body;
    User.findOne({email})
    .then(user => {
        if(user && user.password === password){ 
            res.json("Success");
        }       
        else{
            res.json("Incorrect or user doesnt exist");
        }
    });
});

app.post('/register', (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(e => res.json(e));
});

app.listen(3001, () => console.log("server is running"));