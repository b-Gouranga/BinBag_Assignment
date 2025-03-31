const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { CustomError } = require("../utils/errorHandler");

const registerUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new CustomError("User already exists", 400);

    const user = new User(userData);
    await user.save();
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError("Invalid credentials", 401);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return { user, token };
};

module.exports = { registerUser, loginUser };
