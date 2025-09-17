const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectToDB = require("./database/db");
const userRoutes = require("./routes/User.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectToDB();

app.get('/', (req,res) => {
    res.send("Hello bhai");
})

app.use("/users",userRoutes);

module.exports = app;
