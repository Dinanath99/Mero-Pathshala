import { User } from "../models/user.model.js";

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = user;
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Role '${user.role}' is not authorized to access this resource.`,
        });
      }
      next();
    } catch (error) {
      console.error("RBAC authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during authorization check",
      });
    }
  };
};
