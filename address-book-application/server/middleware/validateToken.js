const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers["authorization"] || req.headers["Authorization"];

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
            if(err){
                console.log("hello");
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        });
    }

    if(!token){
        res.status(401);
        throw new Error("User not authorized or token is missing!");
    }
});

module.exports = validateToken;