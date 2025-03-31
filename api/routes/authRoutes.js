const express = require("express");
const { body } = require("express-validator");
const authController = require('../contorllers/authController');
const router = express.Router();

const validateRegistration = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage('Name should be in String')
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
        .trim(),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/\d/).withMessage("Password must contain at least one number")
        .matches(/[A-Za-z]/).withMessage("Password must contain at least one letter"),
    body("address")
        .notEmpty().withMessage("Address is required")
        .isString().withMessage("Adress should be in String")
        .isLength({ min: 5}).withMessage("Address must be at least 5 characters long")
        .trim(),
    body("bio")
        .optional()
        .isString().withMessage("bio should be in String")
        .isLength({ max: 200 }).withMessage("Bio should not exceed 200 characters")
        .trim(),
    body("profilePicture").optional().isURL().withMessage("Invalid URL for profile picture")

];

const validateLogin = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required")
];


router.post("/register",validateRegistration,authController.register );
router.post("/login", validateLogin,authController.login);

module.exports = router;
