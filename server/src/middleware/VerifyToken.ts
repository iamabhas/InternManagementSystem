import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers.authorization?.split(" ")[1];
  const cookies = req.cookies.access_token;
  console.log(cookies);
  const token = cookies?.split("=")[1];
  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token" });
      }

      const jwtpayload = decoded as JwtPayload;
      req.user = jwtpayload;
      next();
    }
  );
};
