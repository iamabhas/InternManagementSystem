import { Request, Response } from "express";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import { handleTwoErrorResponse } from "../utils/Errors/CommonoTwoResponseError";
export const TestController = async (_req: Request, res: Response) => {
  handleTwoErrorResponse(res, 201, true, "Middleware verify token Passed");
};
