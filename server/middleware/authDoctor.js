import jwt from 'jsonwebtoken';

// Doctor Authentication Middleware
const authDoctor = async (req, res, next) => {
  try {
    const { token } = req.headers;

    // Check if Authorization header exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is missing or invalid',
      });
    }

    // Verify and decode token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.role !== 'doctor') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only doctors can access this route',
      });
    }

    // Attach userId to req object in a non-conflicting way
    req.user = { id: decodedToken.id };
    next();
  } catch (error) {
    // Log the error safely
    console.error('Authentication error:', error.message);

    // side cases
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please provide a valid authorization token.',
      });
    }

    // Return a generic error message to avoid leaking sensitive information
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access. Please log in again.',
    });
  }
};

export default authDoctor;
