const CustomError = require("../library/Error");
const { HTTP_CODES } = require("../library/Enum");

function checkRole(allowedRoles) {
    return (req, res, next) => {
        const userRoles = req.user.roles; 

        const hasRole = userRoles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            const error = new CustomError(HTTP_CODES.FORBIDDEN, "Access Denied: Insufficient Permissions");
            return res.status(error.code).json({ message: error.message });
        }

        next();
    };
}

module.exports = checkRole;
