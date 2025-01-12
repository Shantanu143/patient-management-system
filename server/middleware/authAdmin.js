import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    // check if token exits
    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please log in again.",
      });
    }

    // verify the token
    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);

    let email = process.env.ADMIN_EMAIL;
    if (
      decodedToken.email !== email ||
      decodedToken.role != process.env.ADMIN_ROLE
    ) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Admin access required.",
      });
    }

    next();
  } catch (error) {
    console.log("Auth Error : " + error);

    // handle token expiration or invalid token
    if (error.name == "TokenExpiredError") {
      return res.status(401).send({
        success: false,
        message: "Session expire. Plaease log in again",
      });
    }

    if (error.name == "JsonWebTokenError") {
      return res.status(401).send({
        success: false,
        message: "Invalid token. Please log in again",
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Admin Auth Error : " + error.message });
  }
};

export default authAdmin;
