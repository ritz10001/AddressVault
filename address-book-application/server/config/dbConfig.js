const mongoose = require("mongoose");

const connectDb = async (req, res) => {
    try{
        const connect = await mongoose.connect("mongodb+srv://ritz10001:admin@cluster0.jktyax6.mongodb.net/");
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
    
}
module.exports = connectDb;