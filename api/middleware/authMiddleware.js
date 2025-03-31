const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/errorHandler");

exports.protect = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return next(new CustomError("Access Denied", 401));
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new CustomError("Invalid Token", 403));
    }
};
