import {Request, NextFunction} from "express";

export const internValidation = () => {
    console.log("Outside")
    return (req: Request, _: any, next: NextFunction) => {
        // const userId = req.user.user_id
        // const userRole = req.user.role
        // const paramsId = req.params.id
        // console.log(userId, userRole, paramsId);
        console.log("Inside")
        next()
    }

}