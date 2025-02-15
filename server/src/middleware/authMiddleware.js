const jwt = require("jsonwebtoken");
const User = require("../models/users.model/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    let decoded;
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "id email name photoURL refreshToken"
    );
    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "User not found. Unauthorized!",
      });
    }

    // Attach user payload to request
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error.",
    });
  }
};
module.exports = authMiddleware;
