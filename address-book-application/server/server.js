const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/userSchema");
const connectDb = require("./config/dbConfig");
const app = express();
const userRoutes = require("./routes/userRoutes");
const vaultRoutes = require("./routes/vaultRoutes");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
app.use(express.json());
app.use(cors());

connectDb();

app.use("/vault", vaultRoutes);
app.use("/user", userRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("server is running"));