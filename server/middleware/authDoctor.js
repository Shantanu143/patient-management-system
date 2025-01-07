import jwt from "jsonwebtoken";

// Doctor Authentication Middleware
const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    // Extract token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify and decode token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to req object in a non-conflicting way
    req.user = { id: decodedToken.id };

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Log the error safely
    console.error("Authentication error:", error.message);

    // side cases
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please provide a valid authorization token.",
      });
    }

    // Return a generic error message to avoid leaking sensitive information
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Please log in again.",
    });
  }
};

export default authDoctor;
