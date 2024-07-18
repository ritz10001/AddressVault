const mongoose = require("mongoose");

const connectDb = async (req, res) => {
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECT);
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
    
}
module.exports = connectDb;