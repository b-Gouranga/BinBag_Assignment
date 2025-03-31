require("dotenv").config();
const express = require("express");
const connectDB = require("./config/config");
const authRoutes = require("./api/routes/authRoutes");
const userRoutes = require("./api/routes/userRoutes");
const { errorHandler } = require("./api/utils/errorHandler");
const path = require("path");
const app = express();
app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
