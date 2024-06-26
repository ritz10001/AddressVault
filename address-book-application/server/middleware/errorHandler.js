const express = require("express");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode;
    switch(statusCode){
        case 400:
            res.json({
                title: "VALIDATION FAILED!",
                message: err.message,
                stackTrace: err.stack
            }); 
            break;
        case 401:
            res.json({
                title: "UNAUTHORIZED!",
                message: err.message,
                stackTrace: err.stack
            }); 
            break;
        case 403:
            res.json({
                title: "FORBIDDEN!",
                message: err.message,
                stackTrace: err.stack
            }); 
            break;
        case 404:
            res.json({
                title: "NOT FOUND!",
                message: err.message,
                stackTrace: err.stack
            }); 
            break;
        case 500:
            res.json({
                title: "SERVER ERROR!",
                message: err.message,
                stackTrace: err.stack
            }); 
            break;
        default:
            break;
    };
}

module.exports = errorHandler;