import {Request, Response, NextFunction} from "express";
import {roleConstants} from "../constants/roleConstants";
import AppError from "../utils/errorUtils/appError";

const {ADMIN, USER, SUPER_ADMIN, MENTOR} = roleConstants;


export const validateRole = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const role: string = req.user.role;
    if (typeof role !== "string" || role === null || undefined) {
        throw new AppError("Role is not valid Type", 405);
    }
    const roleArray: Array<String> = [ADMIN, USER, SUPER_ADMIN, MENTOR];

    if (roleArray.includes(role)) {
        next();
    } else {
        throw new AppError(`${role} Does Not Exists`, 401);
    }
};
