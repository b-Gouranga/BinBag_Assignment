const authService= require("../services/authService");
const { validationResult } = require("express-validator");
const register = async (req, res) => {
    
    try {
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const user = await authService.registerUser(req.body);
        res.status(201).json({ success: true, message: "User registered", user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);
        res.status(200).json({ success: true, token, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {register,login}