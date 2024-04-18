import { Request, Response } from "express";
import { handleFourStatusError } from "../utils/Errors/CommonFourResponseError";
import { handleTwoStatusResponse } from "../utils/Errors/CommonoTwoResponseError";
export const TestController = async (_req: Request, res: Response) => {
  handleFourStatusError(res, 201, "test", "Middleware verify token Passed");
};
