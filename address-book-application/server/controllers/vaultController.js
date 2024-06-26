const asyncHandler = require("express-async-handler");
const express = require("express");
const mongoose = require("mongoose");
const Vault = require("../models/vaultSchema");

const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Vault.find({userId: req.user.id});
    res.status(200).json(addresses); 
});

const getAddressById = asyncHandler(async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400);
        throw new Error("Invalid Id type!");
    }
    const address = await Vault.findById({_id: req.params.id});

    if(!address){
        res.status(404);
        throw new Error("Address not found");
    }
    res.status(200).json(address);
});

const createAddress = asyncHandler(async (req, res) => {
    const {name, email, phone, addressLine1, addressLine2 = '', city, state, postalCode, country} = req.body;

    if(!name || !email || !phone || !addressLine1 || !city || !state || !postalCode || !country){
        res.status(400);
        throw new Error("All fields must be filled!");
    }

    const address = await Vault.create({
        name,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country
    });

    res.status(201).json(address);
});


const updateAddress = asyncHandler(async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400);
        throw new Error("Invalid Id type!");
    }
    
    const address = await Vault.findById({_id: req.params.id});

    if(!address){
        res.status(404);
        throw new Error("Address not found");
    }
    const updatedAddress = await Vault.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedAddress);
});

const deleteAddress = asyncHandler(async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400);
        throw new Error("Invalid Id type!");
    }
    
    const address = await Vault.findById({_id: req.params.id});

    if(!address){
        res.status(404);
        throw new Error("Address not found");
    }

    await Vault.deleteOne({_id: req.params.id});
    res.status(200).json(address);
});
module.exports = {getAddresses, getAddressById, createAddress, updateAddress, deleteAddress};