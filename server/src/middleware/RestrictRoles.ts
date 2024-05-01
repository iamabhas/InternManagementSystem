import { Request, Response, NextFunction } from "express";

export const restrictRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.user.role;
    if (roles.includes(userRole)) {
      return res.status(403).json({
        message: "Your role is not allowed to access this route",
      });
    }
    next();
  };
};
