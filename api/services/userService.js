const User = require("../models/User");
const { CustomError } = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");

const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new CustomError("User not found", 404);
    return user;
};


const updateUserProfile = (userId, updateData) => {
    
    const allowedFields = ["name", "email", "address", "bio", "profilePicture"];

    
    const filteredData = Object.fromEntries(
        Object.entries(updateData)
            .filter(([key, value]) => allowedFields.includes(key) && value !== undefined)
    );

    return User.findByIdAndUpdate(userId, filteredData, { new: true }).select("-password")
        .then(user => {
            if (!user) throw new CustomError("User not found", 404);
            return user;
        });
};

const uploadProfilePicture = async (userId, file) => {
    if (!file) {
        throw new CustomError("No file uploaded", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError("User not found", 404);
    }

    // Delete existing profile picture (if any)
    if (user.profilePicture) {
        const oldFilePath = path.join(__dirname, "..", user.profilePicture);
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
    }

    console.log(`uploads/${file.filename}`)
    const filePath = `uploads/${file.filename}`;
    console.log("Saving file path:", filePath)
    user.profilePicture = filePath;
    await user.save();

    return filePath;
};



module.exports = { getUserProfile, updateUserProfile, uploadProfilePicture };
