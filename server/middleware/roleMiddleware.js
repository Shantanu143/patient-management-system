const authRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.roles)) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorize User" });
    }
    next();
  };
};

export default authRoles;
