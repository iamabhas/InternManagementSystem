import {Request, NextFunction} from "express";
import {roleConstants} from "../constants/roleConstants";
import AppError from "../utils/errorUtils/appError";

const {USER} = roleConstants

export const internValidation = (req: Request, _: any, next: NextFunction) => {
    const userId = req.user.user_id
    const userRole = req.user.role
    const paramsId = req.params.id

    if (userRole === USER) {
        if (userId !== paramsId) {
            next(new AppError("Can't fetch data of other interns", 400))
        }
    }
    next()
}