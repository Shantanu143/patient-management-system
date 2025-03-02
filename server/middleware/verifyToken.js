import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }

    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verify Token Error : " + error.message,
    });
  }
};

export default verifyToken;
