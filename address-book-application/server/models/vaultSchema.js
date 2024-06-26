const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        match: [/\S+@\S+\.\S+/, 'is invalid']
      },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 15,
        match: [/^\+?[1-9]\d{1,14}$/, 'is invalid']
    },
    addressLine1: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    addressLine2: {
        type: String,
        trim: true,
        maxlength: 255
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
      },
    state: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 10
    },
    country: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    }
}, {timestamps: true}); 

module.exports = mongoose.model("Vault", vaultSchema);