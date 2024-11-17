const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({
        Success: false,
        error: "Access denied"
    });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            Success: false,
            error: "Invalid token"
        });
    }
};

module.exports = userAuth;