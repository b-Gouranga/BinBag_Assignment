const express = require("express");
const { body } = require("express-validator");
const userController = require("../contorllers/userController");

const { protect} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const validateProfileUpdate = [
    body("name")
        .optional()
        .isString().withMessage("name should be in String")
        .isLength({ min: 3 }).withMessage("name must be at least 5 characters long")
        .trim(),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalide Email Format")
        .normalizeEmail(),
    body("address")
        .optional()
        .isString().withMessage("bio should be in String")
        .isLength({ min: 5 }).withMessage("Address must be at least 5 characters long")
        .trim(),
    body("bio")
        .optional()
        .isString().withMessage("bio should be in String")
        .isLength({ max: 200 }).withMessage("Bio should not exceed 200 characters")
        .trim(),
];



//get-Profile
router.get("/profile", protect,userController.getProfile );

//update-Profile
router.patch("/profile", protect,validateProfileUpdate, userController.updateProfile);

//uplaod Profile Pic
router.post("/upload",protect, upload.single("profilePicture"), userController.uploadProfilePicture);

module.exports = router;
