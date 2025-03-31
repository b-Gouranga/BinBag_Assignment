const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const getProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateProfile = async(req, res) => {
    
    try {
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const user = await userService.updateUserProfile(req.user.id, req.body);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message });
    }

};

const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;

        const filePath = await userService.uploadProfilePicture(userId, file);

        res.json({ message: "Profile picture updated successfully", profilePicture: filePath });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {updateProfile, getProfile,uploadProfilePicture }