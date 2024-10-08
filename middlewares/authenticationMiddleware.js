const User = require("../models/User");
const AuthService = require("../firebase/auth/authentication");
const {HTTP_CODES} = require("../library/Enum");


const authenticate = async (req, res, next) => {
    try {
        const authService = new AuthService();
        const firebaseUser = await authService.verifyToken(req.headers.authorization); 

        const user = await User.getById(firebaseUser.uid);
        if (!user) {
            return res.status(HTTP_CODES.UNAUTHORIZED).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
};

module.exports = authenticate;
