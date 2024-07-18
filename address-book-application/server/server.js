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
const envRouter = require("./routes/envRoute");
const port = process.env.port || 3001;

app.use(express.json());
app.use(cors());

connectDb();

app.use("/vault", vaultRoutes);
app.use("/user", userRoutes);
app.use('/api', envRouter);
app.use(errorHandler);

app.listen(port, () => console.log("server is running"));